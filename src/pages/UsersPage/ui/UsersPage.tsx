import {adminApi} from "@/features/Administration/api/adminApi.ts";
import {
    Button,
    ConfigProvider,
    Dropdown,
    Flex,
    MenuProps,
    Popconfirm,
    Select,
    Space,
    Table,
    Tag
} from "antd";
import Loader from "@/shared/ui/Loader/Loader.tsx";
import {ColumnsType} from "antd/es/table";
import {Profile, UserRoles} from "@/entities/User/model/types";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import ruRU from 'antd/es/locale/ru_RU';
import {DownOutlined} from "@ant-design/icons";
import {FindInTableForm} from "@/features/Administration/ui/FindInTableForm/FindInTableForm.tsx";
import {RoutePath} from "@/app/providers/routes/model/constants";


export const UsersPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState<number>(20);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>(undefined)
    const [sortBy, setSortBy] = useState<string | undefined>(undefined)
    const [isBlocked, setIsBlocked] = useState<boolean | undefined>(undefined)
    const [search, setSearch] = useState<string|undefined>(undefined)
    const {data, isFetching, isSuccess, isLoading} = adminApi.useGetAllUsersQuery({
            limit,
            offset: currentPage - 1,
            sortBy: sortBy,
            sortOrder: sortOrder,
            isBlocked: isBlocked,
            search: search,
        },
        {refetchOnFocus: true, refetchOnMountOrArgChange: true}
    )

    const [deleteUser, {isLoading: delLoading}] = adminApi.useDeleteUserMutation()
    const [blockUser, {isLoading: isBlockLoading}] = adminApi.useBlockUserMutation()
    const [unblockUser, {isLoading: isUnblockLoading}] = adminApi.useUnblockUserMutation()
    const [editRights, {isLoading: isEditRightsLoading}] = adminApi.useEditRightsMutation()
    const navigate = useNavigate();
    const totalAmount = data?.meta.totalAmount

    const LGBTStyle = {
        background: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)',
        color: 'white',
        border: '1px solid transparent',
    };

    const menuNameSortItems: MenuProps['items'] = [
        {key: 'asc', label: 'Сортировать по возрастанию'},
        {key: 'desc', label: 'Сортировать по убыванию'},
        {key: 'none', label: 'Сбросить сортировку'},
    ].map(item => ({
        ...item,
        style: sortOrder === item.key || (!sortOrder && item.key === 'default')
            ? {backgroundColor: '#e6f7ff', color: '#1890ff'}
            : {},
    }));

    const menuEmailSortItems: MenuProps['items'] = [
        {key: 'asc', label: 'Сортировать по возрастанию'},
        {key: 'desc', label: 'Сортировать по убыванию'},
        {key: 'none', label: 'Сбросить сортировку'},
    ].map(item => ({
        ...item,
        style: sortOrder === item.key || (!sortOrder && item.key === 'default')
            ? {backgroundColor: '#e6f7ff', color: '#1890ff'}
            : {},
    }));

    const handleGoToUserById =  (id: number) => {
        navigate(RoutePath.Get_ADMIN_USER(id))
    }

    const columns: ColumnsType<Profile> = [
        {
            title: (
                <Dropdown
                    menu={{
                        items: menuNameSortItems,
                        onClick: (e) => {
                            if (e.key === 'asc' || e.key === 'desc') {
                                handleSortChange(e.key as 'asc' | 'desc', 'username');
                            } else {
                                handleSortChange(undefined, '');
                            }
                        },
                    }}
                    trigger={['click']}
                >
                    <Button type="link">
                        Имя <DownOutlined/>
                    </Button>
                </Dropdown>
            ),
            dataIndex: 'username',
            key: 'username',

        },
        {
            title: (
                <Dropdown
                    menu={{
                        items: menuEmailSortItems,
                        onClick: (e) => {
                            if (e.key === 'asc' || e.key === 'desc') {
                                handleSortChange(e.key as 'asc' | 'desc', 'email');
                            } else {
                                handleSortChange(undefined, '');
                            }
                        }
                    }}
                    trigger={['click']}
                >
                    <Button type={'link'}>
                        Email <DownOutlined/>
                    </Button>
                </Dropdown>
            ),
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Дата регистрации',
            dataIndex: 'date',
            key: 'date',
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Статус блокировки',
            dataIndex: 'isBlocked',
            key: 'isBlocked',

            filterDropdown: ({selectedKeys}) => (<div style={{padding: 8, width: 200}}>
                <Select
                    style={{width: 170}}
                    value={
                        selectedKeys[0] === undefined
                            ? isBlocked === undefined
                                ? 'all'
                                : isBlocked
                                    ? 'Заблокированные'
                                    : 'Не заблокированные'
                            : (selectedKeys[0] as 'all' | 'Заблокированные' | 'Не заблокированные')
                    }
                    onChange={handleIsBlockedFilter}
                >
                    <Select.Option value={'all'}>Все</Select.Option>
                    <Select.Option value={true}>Заблокированные</Select.Option>
                    <Select.Option value={false}>Не заблокированные</Select.Option>
                </Select>
            </div>),
            render: (isBlocked: boolean) => isBlocked ? 'Заблокирован' : 'Не заблокирован'
        },
        {
            title: 'Роли пользователя',
            dataIndex: 'roles',
            key: 'roles',
            render: (roles: UserRoles[]) => (
                roles.map((role) => {
                    let color;
                    if (role === UserRoles.USER) color = 'blue'
                    if (role === UserRoles.MODERATOR) color = 'green'
                    if (role === UserRoles.ADMIN) color = 'red'


                    if (role === UserRoles.HUILA) return <Tag style={LGBTStyle} key={role}>{role}</Tag>
                    return (
                        <Tag color={color} key={role}>{role}</Tag>
                    )
                })
            )
        },
        {
            title: 'Телефон',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Управление',
            dataIndex: 'management',
            render: (_, record) => (
                <Space style={{width: '100%'}} wrap>
                    <Flex vertical gap={10}>
                        <Popconfirm
                            title={record.isBlocked ? 'Разблокировать пользователя?' : 'Под шконку?'}
                            onConfirm={() => handleBanUnbanUser(record.id, record.isBlocked)}
                        >
                            <Button
                                loading={record.isBlocked ? isUnblockLoading : isBlockLoading}
                                style={{background: !record.isBlocked ? "rgba(243,222,154,0.47)" : "rgba(230,198,183,0.47)"}}
                            >
                                {record.isBlocked ? 'Разблокировать' : 'Заблокировать'}
                            </Button>
                        </Popconfirm>
                        <Popconfirm
                            onConfirm={() => handleAdminingUnadmining(record.id, record.roles)}
                            title={record.roles.includes(UserRoles.ADMIN) ? 'Забрать роль админа?' : 'Выдать роль админа?'}
                        >
                            <Button
                                loading={isEditRightsLoading}
                                style={{background: !record.roles.includes(UserRoles.ADMIN) ? "rgba(89,237,232,0.47)" : "rgba(246,208,232,0.47)"}}
                            >
                                {record.roles.includes(UserRoles.ADMIN) ? 'Забрать админа' : 'Дать админа'}
                            </Button>
                        </Popconfirm>
                    </Flex>
                </Space>
            )
        },
        {
            title: 'Действия',
            dataIndex: 'actions',
            render: (_, record) => (
                <Space>
                    <Button
                        onClick={() => handleGoToUserById(record.id)}
                        style={{background: "rgba(7,151,241,0.47)"}}
                    >
                        Открыть
                    </Button>
                    <Popconfirm title={'Вы действительно хотите удаль пользователя?'}
                                onConfirm={() => handleDeleteUser(record.id)}>
                        <Button style={{background: "rgba(241,7,7,0.47)"}} loading={delLoading}>Удалить</Button>
                    </Popconfirm>

                </Space>
            )

        }
    ]
    const handleBanUnbanUser = async (id: number, isBanned: boolean) => {
        try {
            if (isBanned) {
                await unblockUser(id)
            } else {
                await blockUser(id)
            }
        } catch (error) {
            console.error(error);
        }
    }
    const handleAdminingUnadmining = async (id: number, roles: UserRoles[]) => {
        try {
            await editRights([
                id,
                {
                    roles: roles.includes(UserRoles.ADMIN)
                        ? roles.filter((role) => role !== UserRoles.ADMIN)
                        : [...roles, UserRoles.ADMIN],
                },
            ]);
        } catch (error) {
            console.error(error);
        }
    }

    const handleIsBlockedFilter = (value: 'all' | 'Заблокированные' | 'Не заблокированные') => {
            if (value === 'all') {
                setIsBlocked(undefined)
                setCurrentPage(1)
            }
            else {
                setIsBlocked(Boolean(value))
                setCurrentPage(1)
            }
    }


    const handleDeleteUser = async (id: number) => {
        await deleteUser(id)
    }
    const handleSearch = (value: {search: string| undefined}) => {
        setSearch(value.search)
        setCurrentPage(1)
    }

    const handleResetTable = () => {
        setLimit(20)
        setCurrentPage(1)
        setSortOrder(undefined)
        setSortBy('')
        setIsBlocked(undefined)
        setSearch(undefined)
    }

    const handleSortChange = (order: 'asc' | 'desc' | undefined, field: string | undefined) => {
        setSortOrder(order);
        setSortBy(field);
        setCurrentPage(1)

    };

    if (isFetching || isLoading) return <Loader/>
    return (
        <ConfigProvider
            locale={{
                ...ruRU,
                Table: {
                    ...ruRU.Table,
                    triggerDesc: 'Сортировать по убыванию',
                    triggerAsc: 'Сортировать по возрастанию',
                    cancelSort: 'Отменить сортировку',
                },
            }}
        >
            <Flex vertical justify="center" align="center">
                {isSuccess &&
                    <Flex style={{width: 1080}} justify={'space-between'}>
                        <Button onClick={handleResetTable}>Сбросить все</Button>
                        <FindInTableForm
                            handleSearch={handleSearch}
                        />
                    </Flex>

                }
                {isSuccess && data.data && data.data.length > 0 ? (
                    <Table<Profile>
                        columns={columns}
                        dataSource={data.data}
                        rowKey="id"
                        onChange={(pagination, _, sorter) => {
                            if (!Array.isArray(sorter)) {
                                const order = sorter.order === 'ascend' ? 'asc' : sorter.order === 'descend' ? 'desc' : undefined;
                                const sortBy = sorter.field;

                                if (order && sortBy) {
                                    setCurrentPage(pagination.current || 1);
                                }
                            }
                        }}
                        pagination={{
                            pageSize: limit,
                            current: currentPage,
                            total: totalAmount,
                            showSizeChanger: true,
                            pageSizeOptions: ['10', '20'],
                            onChange: (page, pageSize) => {
                                setCurrentPage(page);
                                setLimit(pageSize);
                            },
                        }}
                    />
                ) : (
                    <p>юзеров нет</p>

                )}
            </Flex>
        </ConfigProvider>

    );
};


