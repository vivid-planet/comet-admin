import {
    createRestPagingActions,
    Field,
    FieldContainerLabelAbove,
    FinalFormInput,
    SortDirection,
    Table,
    TableFilterFinalForm,
    TableQuery,
    useTableQuery,
    useTableQueryFilter,
    useTableQueryPaging,
    useTableQuerySort,
} from "@comet/admin";
import { storiesOf } from "@storybook/react";
import gql from "graphql-tag";
import * as qs from "qs";
import * as React from "react";

import { apolloStoryDecorator } from "../../apollo-story.decorator";

const gqlRest = gql;

const query = gqlRest`
query users(
    $pathFunction: any
    $page: Int
    $sort: String
    $order: String
    $query: String
) {
    users(
        page: $page
        sort: $sort
        order: $order
        query: $query
    ) @rest(type: "UsersPayload", pathBuilder: $pathFunction) {
        meta @type(name: "UsersMeta") {
            totalCount
            links
        }
        data @type(name: "User") {
            id
            name
            username
            email
        }
    }
}
`;

interface IQueryData {
    users: {
        meta: {
            totalCount: number;
            links: IResponseLinks;
        };
        data: Array<{
            id: number;
            name: string;
            username: string;
            email: string;
        }>;
    };
}

function pathFunction({ args }: { args: { [key: string]: any } }) {
    interface IPathMapping {
        [arg: string]: string;
    }
    const paramMapping: IPathMapping = {
        query: "q",
        page: "_page",
        sort: "_sort",
        order: "_order",
    };

    const q = Object.keys(args).reduce((acc: { [key: string]: any }, key: string): { [key: string]: any } => {
        if (paramMapping[key] && args[key]) {
            acc[paramMapping[key]] = args[key];
        }
        return acc;
    }, {});
    return `users?_limit=5&${qs.stringify(q, { arrayFormat: "brackets" })}`;
}

interface IVariables extends IFilterValues {
    pathFunction: any;
    page: number;
    sort: string;
    order: string;
}
interface IFilterValues {
    query?: string;
}

function Story() {
    const filterApi = useTableQueryFilter<IFilterValues>({});

    const pagingApi = useTableQueryPaging(1);
    const sortApi = useTableQuerySort({
        columnName: "name",
        direction: SortDirection.ASC,
    });
    const { tableData, api, loading, error } = useTableQuery<IQueryData, IVariables>()(query, {
        variables: {
            pathFunction,
            sort: sortApi.current.columnName,
            order: sortApi.current.direction,
            page: pagingApi.current,
            ...filterApi.current,
        },
        resolveTableData: (data) => ({
            data: data.users.data,
            totalCount: data.users.meta.totalCount,
            pagingInfo: createRestPagingActions(
                pagingApi,
                {
                    nextPage: data.users.meta.links.next,
                    previousPage: data.users.meta.links.prev,
                    totalPages: data.users.meta.totalCount / 5,
                },
                {
                    pageParameterName: "_page",
                },
            ),
        }),
    });

    return (
        <TableQuery api={api} loading={loading} error={error}>
            {tableData && (
                <>
                    <TableFilterFinalForm<IFilterValues> filterApi={filterApi}>
                        <Field
                            name="query"
                            type="text"
                            label="Query"
                            component={FinalFormInput}
                            fullWidth
                            fieldContainerComponent={FieldContainerLabelAbove}
                        />
                    </TableFilterFinalForm>
                    <Table
                        sortApi={sortApi}
                        {...tableData}
                        columns={[
                            {
                                name: "name",
                                header: "Name",
                                sortable: true,
                            },
                            {
                                name: "username",
                                header: "Username",
                                sortable: true,
                            },
                            {
                                name: "email",
                                header: "E-Mail",
                                sortable: true,
                            },
                        ]}
                    />
                </>
            )}
        </TableQuery>
    );
}

interface IResponseLinks {
    first?: string;
    prev?: string;
    next?: string;
    last?: string;
}
storiesOf("@comet/admin/table", module)
    .addDecorator(
        apolloStoryDecorator({
            responseTransformer: async (response) => {
                const links: IResponseLinks = {};
                const linkMatches = response.headers.get("link").match(/<(.*?)>; rel="(.*?)"/g) || [];
                linkMatches.forEach((i: string) => {
                    const m = i.match(/<(.*?)>; rel="(.*?)"/);
                    if (m) {
                        links[m[2] as keyof IResponseLinks] = m[1];
                    }
                });
                return {
                    data: await response.json(),
                    meta: {
                        links,
                        totalCount: response.headers.get("x-total-count"),
                    },
                };
            },
        }),
    )
    .add("Filter Paging Sort", () => <Story />);
