import Button from '~/components/Button';

const customerColumns = [
    {
        id: 'select',
        header: ({ table }) => {
            return (
                <input
                    type="checkbox"
                    checked={table.getIsAllPageRowsSelected()}
                    onChange={(e) => {
                        table.toggleAllPageRowsSelected(e.target.checked);
                    }}
                />
            );
        },
        cell: ({ row }) => {
            return (
                <input
                    type="checkbox"
                    checked={row.getIsSelected()}
                    onChange={(e) => {
                        row.toggleSelected(e.target.checked);
                    }}
                />
            );
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        header: ({ column }) => {
            return (
                <Button
                    onClick={() => {
                        column.toggleSorting(column.getIsSorted() === 'asc');
                    }}
                >
                    Person ID
                </Button>
            );
        },
        accessKey: 'id',
    },
    {
        header: 'First Name',
        accessorKey: 'first_name',
    },
    {
        header: 'Last Name',
        accessorKey: 'last_name',
    },
    {
        header: 'Email',
        accessorKey: 'email',
    },
    {
        header: 'Gender',
        accessorKey: 'gender',
    },
];

export default customerColumns;
