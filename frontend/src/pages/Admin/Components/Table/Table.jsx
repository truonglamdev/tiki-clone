import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import * as XLSX from 'xlsx';
import Button from '~/components/Button';
import styles from './Table.module.scss';

const cx = classNames.bind(styles);
function Table({ data, columns }) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        columnResizeMode: 'onChange',
        state: {},
    });

    const downLoadToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, `customers.xlsx`);
    };

    const handleSearch = (e) => {};

    return (
        <div>
            <div className={cx('container')}>
                <div className={cx('toolbar')}>
                    <div className={cx('search')}>
                        <input
                            className={cx('input')}
                            // value={table.getColumn('name')?.getFilterValue() || ''}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className={cx('export')}>
                        <Button small className={cx('export-btn')} onClick={downLoadToExcel}>
                            Export to excel
                        </Button>
                    </div>
                </div>
            </div>
            <table style={{ width: table.getTotalSize() }}>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} style={{ width: header.getSize() }}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    <div
                                        onMouseDown={header.getResizeHandler()}
                                        onTouchStart={header.getResizeHandler()}
                                        className={cx('resizer', header.column.getIsResizing() ? 'isResizing' : '')}
                                    ></div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} style={{ width: cell.column.getSize() }}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={cx('pagination')}>
                <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    prev
                </button>
                <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    next
                </button>
            </div>
            <div className={cx('total-page')}>
                {table.getState().pagination.pageIndex + 1} of {table.getFilteredRowModel().rows.length} row(s) selected
            </div>
        </div>
    );
}

Table.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
};

export default Table;
