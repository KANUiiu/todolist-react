import { create } from 'zustand'
import { nanoid } from 'nanoid' // to generate one unique id for each comment

const useCommentStore = create((set) => ({
  comments: {},
  visibleComments: {},

  addComment: (todoId, comment) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [todoId]: [
          ...(state.comments[todoId] || []),
          {
            id: nanoid(),
            text: comment,
          },
        ],
      },
    })),
  
  updateComment: (todoId, commentId, newText) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [todoId]: state.comments[todoId].map((comment) =>
          comment.id === commentId
            ? { ...comment, text: newText }
            : comment
        ),
      },
    })),
  
  deleteComment: (todoId, commentId) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [todoId]: state.comments[todoId].filter(
          (comment) => comment.id !== commentId
        ),
      },
    })),

  toggleCommentBox: (todoId) =>
    set((state) => ({
      visibleComments: {
        ...state.visibleComments,
        [todoId]: !state.visibleComments[todoId],
      },
    })),
}))

export default useCommentStore
