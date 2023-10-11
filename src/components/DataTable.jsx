import React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faCaretLeft, faForward, faCaretRight } from '@fortawesome/free-solid-svg-icons';

function DataTable({ data }) {
    const columns = React.useMemo(
        () => [
            {
                Header: 'หลักสูตร',
                accessor: 'name',
            },
            {
                Header: 'แผนรับ',
                accessor: 'plan',
            },
            {
                Header: 'สมัคร',
                accessor: 'applicant',
            },
            {
                Header: 'CF',
                accessor: 'confirm',
            },
            {
                Header: 'Stu.i',
                accessor: 'report',
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page, // Use 'page' instead of 'rows' for pagination
        prepareRow,
        state: { pageIndex, pageSize },
        canPreviousPage,
        canNextPage,
        previousPage,
        nextPage,
        gotoPage,
        pageCount,
        pageOptions,
        setPageSize,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 10 }, // Initial page and page size
        },
        useSortBy,
        usePagination
    );

    return (
        <div className='container'>
            <table className="table table-striped" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="row d-flex justify-content-between align-items-center">
                <div className="col-lg-6 col-md-12 col-sm pb-3">
                    <div className="pagination">
                        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                            <FontAwesomeIcon icon={faBackward} />
                        </button>{' '}
                        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                            <FontAwesomeIcon icon={faCaretLeft} />
                        </button>{' '}
                        <button onClick={() => nextPage()} disabled={!canNextPage}>
                            <FontAwesomeIcon icon={faCaretRight} />
                        </button>{' '}
                        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                            <FontAwesomeIcon icon={faForward} />
                        </button>{' '}

                    </div>

                </div>
                <div className="col-lg-6 col-md-12 col-sm pb-3">
                    <span>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </span>
                    <span>
                        | Go to page:{' '}
                        <input
                            type="number"
                            defaultValue={pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                gotoPage(page);
                            }}
                            style={{ width: '50px' }}
                        />
                    </span>{' '}
                    <select
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value));
                        }}
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default DataTable;
