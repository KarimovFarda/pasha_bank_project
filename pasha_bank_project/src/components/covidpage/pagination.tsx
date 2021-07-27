import React from 'react'
export const Pagination = ({ totalPageCount, handlePageChange, currentPage }: any) => {
    var elements = [];
    for (var x = totalPageCount - 1; x >= 0; x--) {
        elements.push(x)
    }
    return (
        <nav aria-label="Page navigation example" className="covid-pagination">
            <ul className="pagination justify-content-center mb-0">
                <li className="page-item">
                    <button style={{ height: "70px" }} onClick={() => handlePageChange(
                        Math.max(currentPage - 1, 1))}
                        className="page-link font-weight-bold text-dark">Previous</button></li>
                {elements.reverse().map(num => (<li className={`page-item ${num + 1 === currentPage && 'active'}`} key={num}>
                    <button style={{height: "70px" }} onClick={() => handlePageChange(num + 1)} className="page-link font-weight-bold text-dark">{num + 1} </button></li>
                ))}
                <li className="page-item"><button style={{ height: "70px" }} onClick={() => handlePageChange(
                    Math.min(currentPage + 1, totalPageCount)
                )} className="page-link font-weight-bold text-dark">Next</button></li>    </ul>
        </nav>)
}
export default Pagination