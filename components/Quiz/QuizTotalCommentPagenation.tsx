import React from 'react'
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

interface Props {
  currentPage: number
  loadComments: (page: number) => Promise<void>
  totalPages: number
}

const QuizTotalCommentPagenation = ({currentPage, loadComments, totalPages}: Props) => {
  return (
    <Pagination>
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious 
          onClick={() => currentPage > 1 && loadComments(currentPage - 1)}
          className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
        />
      </PaginationItem>
      {[...Array(totalPages)].map((_, index) => (
        <PaginationItem key={index}>
          <PaginationLink
            className='cursor-pointer'
            onClick={() => loadComments(index + 1)}
            isActive={currentPage === index + 1}
          >
            {index + 1}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem>
        <PaginationNext 
          onClick={() => currentPage < totalPages && loadComments(currentPage + 1)}
          className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
        />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
  )
}

export default QuizTotalCommentPagenation
