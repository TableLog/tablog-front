import { BOARD_URL } from '@/constants/endpoint.constants';
import instance from '@/utils/axios';

export const getLogList = async (page: number) => {
  return await instance.get(`${BOARD_URL}/desc`, { params: { page } });
};

export const addLog = async (formdata: FormData) => {
  return await instance.post(BOARD_URL, formdata);
};

export const editLog = async (id: number, formdata: FormData) => {
  return await instance.put(`${BOARD_URL}/${id}`, formdata);
};

export const getLog = async (id: number) => {
  return await instance.get(`${BOARD_URL}/${id}`);
};

export const deleteLog = async (id: number) => {
  return await instance.delete(`${BOARD_URL}/${id}`);
};

export const addLogLike = async (id: number) => {
  return await instance.post(`${BOARD_URL}/${id}/likes`);
};

export const removeLogLike = async (id: number) => {
  return await instance.delete(`${BOARD_URL}/${id}/likes`);
};

export const getLogCommentList = async (id: number, page: number) => {
  return await instance.get(`${BOARD_URL}/${id}/board_comments`, {
    params: { page },
  });
};

export const addLogComment = async (id: number, content: string) => {
  return await instance.post(`${BOARD_URL}/${id}/board_comments`, { content });
};

export const addLogCommentReply = async (boardId: number, commentId: number, content: string) => {
  return await instance.post(`${BOARD_URL}/${boardId}/board_comments/${commentId}`, {
    content,
  });
};

export const getLogCommentReplyList = async (boardId: number, commentId: number, page: number) => {
  return await instance.get(`${BOARD_URL}/${boardId}/board_comments/${commentId}/replys`, {
    params: { page },
  });
};
