import { HiMiniArrowsUpDown } from 'react-icons/hi2';
import Button from '~/components/Button';

const handleDeleteUser = (userId) => {
    alert('Are you sure you want to delete this user?');
    if(userId) {
        
    }
};
const handleCopyUser = (user) => {
    navigator.clipboard.writeText(user.name.toString());
};

const columns = [
    {
        accessorKey: '_id',
        header: ({ column }) => {
            return (
                <div
                    style={{ display: 'flex', gap: '12px', cursor: 'pointer' }}
                    onClick={() => {
                        column.toggleSorting(column.getIsSorted() === 'asc');
                    }}
                >
                    Id
                    <div>
                        <HiMiniArrowsUpDown style={{ width: '20px' }} />
                    </div>
                </div>
            );
        },
        size: window.innerWidth < 600 ? 40 : 170,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <div
                    style={{ display: 'flex', gap: '12px', cursor: 'pointer' }}
                    onClick={() => {
                        column.toggleSorting(column.getIsSorted() === 'asc');
                    }}
                >
                    Name
                    <div>
                        <HiMiniArrowsUpDown style={{ width: '20px' }} />
                    </div>
                </div>
            );
        },
        size: window.innerWidth < 600 ? 40 : 170,
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return (
                <div
                    style={{ display: 'flex', gap: '12px', cursor: 'pointer' }}
                    onClick={() => {
                        column.toggleSorting(column.getIsSorted() === 'asc');
                    }}
                >
                    Email
                    <div>
                        <HiMiniArrowsUpDown style={{ width: '20px' }} />
                    </div>
                </div>
            );
        },
        size: window.innerWidth < 600 ? 90 : 130,
    },
    {
        accessorKey: 'phone',
        header: 'Phone',
        // cell: (props) => <p>{props.getValue()}</p>,
        size: window.innerWidth < 600 ? 90 : 130,
    },
    {
        accessorKey: 'actions',
        header: 'Actions',
        size: 220,
        cell: ({ row }) => {
            const user = row.original;
            const userId = user._id;
            return (
                <div style={{ display: 'flex', alignItems: 'center', height: '100%', fontSize: '1rem' }}>
                    <Button primary small onClick={() => handleDeleteUser(userId)}>
                        Delete
                    </Button>
                    <Button outline small onClick={() => handleCopyUser(user)}>
                        Copy name
                    </Button>
                </div>
            );
        },
    },
];

export default columns;
