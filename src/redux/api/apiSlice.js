import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookies } from 'cookies-next';
const prepareHeaders = (headers, { getState }) => {
	//const token = getState()?.auth?.accessToken;
	const token = getCookies('accessToken');
	if (token) {
		headers.set('authorization', `${token?.accessToken}`);
	}

	return headers;
};

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.NEXT_PUBLIC_BASE_API_URL}`,
		prepareHeaders,
	}),
	/* tagTypes: ['savePersonalInfo', 'saveBlobImage'], */
	/* baseQuery: fetchBaseQuery({ baseUrl: 'http://staging.jomma.online:5000/api/v1' }), */
	endpoints: (builder) => ({
		getAllMarketsValue: builder.query({
			query: (searchInfo) => {
				let queryParams = '';

				if (searchInfo?.searchTerm) {
					queryParams += `searchTerm=${searchInfo.searchTerm}`;
				}

				if (searchInfo?.fin_id) {
					queryParams += `${queryParams ? '&' : ''}fin_id=${searchInfo.fin_id}`;
				}

				if (searchInfo?.page) {
					queryParams += `${queryParams ? '&' : ''}page=${searchInfo.page}`;
				}

				if (searchInfo?.limit) {
					queryParams += `${queryParams ? '&' : ''}limit=${searchInfo.limit}`;
				}

				if (searchInfo?.sortBy) {
					queryParams += `${queryParams ? '&' : ''}sortBy=${searchInfo.sortBy}`;
				}
				if (searchInfo?.sortOrder) {
					queryParams += `${queryParams ? '&' : ''}sortOrder=${
						searchInfo.sortOrder
					}`;
				}

				return {
					url: `/markets${queryParams ? `?${queryParams}` : ''}`,
				};
			},
		}),
		getAllNews: builder.query({
			query: (searchInfo) => {
				let queryParams = '';

				if (searchInfo?.PAPER_TYPE) {
					queryParams += `${queryParams ? '&' : ''}PAPER_TYPE=${
						searchInfo.PAPER_TYPE
					}`;
				}

				return {
					url: `markets/news${queryParams ? `?${queryParams}` : ''}`,
				};
			},
		}),
		getGlobalInfo: builder.query({
			query: () => ({
				url: `/global`,
			}),
		}),
		getUserInfo: builder.query({
			query: () => ({
				url: `/user`,
			}),
			providesTags: ['savePersonalInfo'],
		}),

		getJommaVideos: builder.query({
			query: () => ({
				url: `/global/jomma-videos`,
			}),
		}),

		getNewsVideos: builder.query({
			query: () => ({
				url: `/markets/news-videos`,
			}),
		}),
		getTopList: builder.query({
			query: () => ({
				url: `/markets/top-lists`,
			}),
		}),

		getTopicList: builder.query({
			query: () => ({
				url: `/markets/topic-list`,
			}),
		}),
		getTopicDetails: builder.query({
			query: (slug) => ({
				url: `/markets/topic-details/${slug}`,
			}),
		}),
		getQuestionList: builder.query({
			query: (slug) => ({
				url: `/markets/question-list/${slug}`,
			}),
		}),
		getRemainingQuestionList: builder.query({
			query: (slug) => ({
				url: `/markets/remaining-question-list/${slug}`,
			}),
		}),

		getTradingTuesdayList: builder.query({
			query: (searchInfo) => {
				let queryParams = '';

				if (searchInfo?.searchTerm) {
					queryParams += `searchTerm=${searchInfo.searchTerm}`;
				}


				if (searchInfo?.sortBy) {
					queryParams += `${queryParams ? '&' : ''}sortBy=${searchInfo.sortBy}`;
				}
				if (searchInfo?.sortOrder) {
					queryParams += `${queryParams ? '&' : ''}sortOrder=${
						searchInfo.sortOrder
					}`;
				}

				return {
					url: `/markets/trading-tuesday-list${queryParams ? `?${queryParams}` : ''}`,
				};
			},
		}),
	}),
});

export const {
	useGetAllMarketsValueQuery,
	useGetAllNewsQuery,
	useGetNewsVideosQuery,
	useGetGlobalInfoQuery,
	useGetUserInfoQuery,
	useGetJommaVideosQuery,
	useGetTopListQuery,
	useGetTopicListQuery,
	useGetTopicDetailsQuery,
	useGetQuestionListQuery,
	useGetRemainingQuestionListQuery,
	useGetTradingTuesdayListQuery
} = apiSlice;
