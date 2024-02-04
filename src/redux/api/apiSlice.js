import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookies } from 'cookies-next';
const prepareHeaders = (headers, { getState }) => {
	//const token = getState()?.auth?.accessToken;
	const token = getCookies("accessToken");
	if (token) {
		headers.set('authorization', `${token?.accessToken}`);
	}

	return headers;
};

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.NEXT_PUBLIC_BASE_API_URL}`,
		prepareHeaders
	}),
	tagTypes: [
		'savePersonalInfo', 'saveBlobImage',
	  ],
	/* baseQuery: fetchBaseQuery({ baseUrl: 'http://staging.jomma.online:5000/api/v1' }), */
	endpoints: (builder) => ({
		//Create New User
		createUser: builder.mutation({
			query: ({ data }) => ({
				url: `/user/signup`,
				method: 'POST',
				body: data,
			}),
		}),
		verifiedOtp: builder.mutation({
			query: ({ data }) => ({
				url: `/user/verified-otp`,
				method: 'POST',
				body: data,
			}),
		}),
		resendOtp: builder.mutation({
			query: ({ data }) => ({
				url: `/user/resend-otp`,
				method: 'POST',
				body: data,
			}),
		}),
		login: builder.mutation({
			query: ({ data }) => ({
				url: `/user/login`,
				method: 'POST',
				body: data,
			}),
		}),
		forgotPassword: builder.mutation({
			query: ({ data }) => ({
				url: `/user/forgot-password`,
				method: 'POST',
				body: data,
			}),
		}),
		changePassword: builder.mutation({
			query: ({ data }) => ({
				url: `/user/change-password`,
				method: 'POST',
				body: data,
			}),
		}),
		changePasswordFromModal: builder.mutation({
			query: ({ data }) => ({
				url: `/user/change-password-modal`,
				method: 'POST',
				body: data,
			}),
		}),
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
		getDsexValue: builder.query({
			query: () => ({
				url: `markets/dsex`,
			}),
		}),
		getSingleMarketValue: builder.query({
			query: (id) => ({
				url: `/markets/${id}`,
			}),
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
		getUserImage: builder.query({
			query: () => ({
				url: `/user/getBlobimage`,
			}),
			providesTags: ['saveBlobImage'],
		}),
		getOnboardingOptions: builder.query({
			query: () => ({
				url: `/onBoarding/options`,
			}),
		}),
		getOnboardingBanks: builder.query({
			query: () => ({
				url: `/onBoarding/bank-options`,
			}),
		}),

		/* OnBoarding Using Poricoy API */
		verifiyNID: builder.mutation({
			query: ({ data }) => ({
				url: `/onBoarding/nid-verification`,
				method: 'POST',
				body: data,
			}),
		}),
		personalInfo: builder.mutation({
			query: ({ data }) => ({
				url: `/onBoarding/personal-info`,
				method: 'POST',
				body: data,
			}),
		
		invalidatesTags: ['savePersonalInfo'],
		}),
		nomineeNID: builder.mutation({
			query: ({ data }) => ({
				url: `/onBoarding/nominee-info`,
				method: 'POST',
				body: data,
			}),
		}),
		consent: builder.mutation({
			query: ({ data }) => ({
				url: `/onBoarding/consent`,
				method: 'POST',
				body: data,
			}),
		}),
		broker: builder.mutation({
			query: ({ data }) => ({
				url: `/onBoarding/broker-info`,
				method: 'POST',
				body: data,
			}),
		}),

		paymentBkash: builder.mutation({
			query: ({ data }) => ({
				url: `/onBoarding/bkash`,
				method: 'POST',
				body: data,
			}),
		}),
		paymentExecuteBkash: builder.mutation({
			query: ({ data }) => ({
				url: `/onBoarding/bkash-execute`,
				method: 'POST',
				body: data,
			}),
		}),

		skipPayment: builder.mutation({
			query: ({ data }) => ({
				url: `/onBoarding/skip-payment`,
				method: 'POST',
				body: data,
			}),
		}),

		/*OnBoarding Manual */

		manualVerifiyNID: builder.mutation({
			query: ({ data }) => ({
				url: `/onBoardingManual/nid-verification`,
				method: 'POST',
				body: data,
			}),
		}),

		manualNomineeNID: builder.mutation({
			query: ({ data }) => ({
				url: `/onBoardingManual/nominee-info`,
				method: 'POST',
				body: data,
			}),
		}),
		

		getPortfolioValue: builder.query({
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
					url: `/dashboard/portfolio${queryParams ? `?${queryParams}` : ''}`,
				};
			},
		}),

		personalInfoDashboard: builder.mutation({
			query: ({ data }) => ({
				url: `/dashboard/dashboard-user-information`,
				method: 'POST',
				body: data,
			}),
		
		invalidatesTags: ['savePersonalInfo'],
		}),
		
		saveBlobImageDashboard: builder.mutation({
			query: ({ data }) => ({
				url: `/dashboard/dashboard-image`,
				method: 'POST',
				body: data,
			}),
		
		invalidatesTags: ['savePersonalInfo'],
		}),

		getTransectionHistory: builder.query({
			query: (searchInfo) => {
				let queryParams = '';


				if (searchInfo?.startDate) {
					queryParams += `${queryParams ? '&' : ''}startDate=${searchInfo.startDate}`;
				}
				if (searchInfo?.endDate) {
					queryParams += `${queryParams ? '&' : ''}endDate=${searchInfo.endDate}`;
				}
				if (searchInfo?.page) {
					queryParams += `${queryParams ? '&' : ''}page=${searchInfo.page}`;
				}

				return {
					url: `/dashboard/transection-history${queryParams ? `?${queryParams}` : ''}`,
				};
			},
		}),
		getBoPrefundWithdrawHistory: builder.query({
			query: (searchInfo) => {
				let queryParams = '';


				if (searchInfo?.startDate) {
					queryParams += `${queryParams ? '&' : ''}startDate=${searchInfo.startDate}`;
				}
				if (searchInfo?.endDate) {
					queryParams += `${queryParams ? '&' : ''}endDate=${searchInfo.endDate}`;
				}
				if (searchInfo?.requestType) {
					queryParams += `${queryParams ? '&' : ''}requestType=${searchInfo.requestType}`;
				}
				if (searchInfo?.page) {
					queryParams += `${queryParams ? '&' : ''}page=${searchInfo.page}`;
				}

				return {
					url: `/dashboard/bo-prefund-withdraw-history${queryParams ? `?${queryParams}` : ''}`,
				};
			},
		}),

		bkashPayment: builder.mutation({
			query: ({ data }) => ({
				url: `/prefund/bkash`,
				method: 'POST',
				body: data,
			}),
		}),
		bkashPaymentExecute: builder.mutation({
			query: ({ data }) => ({
				url: `/prefund/bkash-execute`,
				method: 'POST',
				body: data,
			}),
		}),
		onlinePayment: builder.mutation({
			query: ({ data }) => ({
				url: `/prefund/online-banking`,
				method: 'POST',
				body: data,
			}),
		}),
		withdrawPayment: builder.mutation({
			query: ({ data }) => ({
				url: `/prefund/withdraw`,
				method: 'POST',
				body: data,
			}),
		}),

		getStockBuyRequest: builder.query({
			query: (searchInfo) => {
				let queryParams = '';

				if (searchInfo?.searchTerm) {
					queryParams += `searchTerm=${searchInfo.searchTerm}`;
				}

				if (searchInfo?.fin_id) {
					queryParams += `${queryParams ? '&' : ''}fin_id=${searchInfo.fin_id}`;
				}
				if (searchInfo?.is_floor_flag) {
					queryParams += `${queryParams ? '&' : ''}is_floor_flag=${searchInfo.is_floor_flag}`;
				}
				if (searchInfo?.order_sl) {
					queryParams += `${queryParams ? '&' : ''}order_sl=${searchInfo.order_sl}`;
				}
				if (searchInfo?.fund_manager_id) {
					queryParams += `${queryParams ? '&' : ''}fund_manager_id=${searchInfo.fund_manager_id}`;
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
					url: `/product/buy-request${queryParams ? `?${queryParams}` : ''}`,
				};
			},
		}),

		getStockSellRequest: builder.query({
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
					url: `/product/sell-request${queryParams ? `?${queryParams}` : ''}`,
				};
			},
		}),

		getOrderId: builder.query({
			query: (isBuyOrSell) => ({
				url: `/product/get-order-id/${isBuyOrSell}`,
			}),
		}),
		getIpoList: builder.query({
			query: () => ({
				url: `/product/get-ipo`,
			}),
		}),

		joinIpo: builder.mutation({
			query: ({ data }) => ({
				url: `/product/join-ipo`,
				method: 'POST',
				body: data,
			}),
		}),

		verifiyThematicInvestNID: builder.mutation({
			query: ({ data }) => ({
				url: `/onBoarding/thematic/nid-verification`,
				method: 'POST',
				body: data,
			}),
		}),



		thematicNomineeNID: builder.mutation({
			query: ({ data }) => ({
				url: `/onBoarding/thematic/nominee-info`,
				method: 'POST',
				body: data,
			}),
		}),
		thematicManualNomineeNID: builder.mutation({
			query: ({ data }) => ({
				url: `/onBoardingManual/thematic/nominee-nid-verification`,
				method: 'POST',
				body: data,
			}),
		}),

		thematicConsent: builder.mutation({
			query: ({ data }) => ({
				url: `/onBoarding/thematic/consent`,
				method: 'POST',
				body: data,
			}),
		}),


		verifiyThematicInvestManualNID: builder.mutation({
			query: ({ data }) => ({
				url: `/onBoardingManual/thematic/nid-verification`,
				method: 'POST',
				body: data,
			}),
		}),

		thematicBkashPayment: builder.mutation({
			query: ({ data }) => ({
				url: `/product/saved-buyInvestmentThemes/bkashPayment`,
				method: 'POST',
				body: data,
			}),
		}),


		thematicBkashPaymentExecute: builder.mutation({
			query: ({ data }) => ({
				url: `/product/saved-buyInvestmentThemes/bkash-execute`,
				method: 'POST',
				body: data,
			}),
		}),


		thematicOnlinePayment: builder.mutation({
			query: ({ data }) => ({
				url: `/product/saved-buyInvestmentThemes/online-banking`,
				method: 'POST',
				body: data,
			}),
		}),

		getJommaVideos: builder.query({
			query: () => ({
				url: `/global/jomma-videos`,
			}),
		}),

		sendEmail: builder.mutation({
			query: ({ data }) => ({
				url: `/global/send-email`,
				method: 'POST',
				body: data,
			}),
		}),


		getGameStocksList: builder.query({
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
					url: `/game/buy-stocks${queryParams ? `?${queryParams}` : ''}`,
				};
			},
		}),

		getGamePortfolioTableValue: builder.query({
			query: (searchInfo) => {
				let queryParams = '';

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
					url: `/game/portfolio-table${queryParams ? `?${queryParams}` : ''}`,
				};
			},
		}),

		getGamePortfolioValue: builder.query({
			query: () => ({
				url: `/game/portfolio`,
			}),
		}),

		getGameOrderId: builder.query({
			query: (isBuyOrSell) => ({
				url: `/game/get-game-order-id/${isBuyOrSell}`,
			}),
		}),


		getGameSellStocksList: builder.query({
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
					url: `/game/sell-stocks${queryParams ? `?${queryParams}` : ''}`,
				};
			},
		}),
		getBonusHistory: builder.query({
			query: (searchInfo) => {
				let queryParams = '';

				if (searchInfo?.searchTerm) {
					queryParams += `searchTerm=${searchInfo.searchTerm}`;
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
					url: `/game/bonus-points-history${queryParams ? `?${queryParams}` : ''}`,
				};
			},
		}),

		redeemedBonusPoints: builder.mutation({
			query: ({ data }) => ({
				url: `/game/convert-bonus-points-to-game-points`,
				method: 'POST',
				body: data,
			}),
		}),
		saveGameName: builder.mutation({
			query: ({ data }) => ({
				url: `/game/save-game-name`,
				method: 'POST',
				body: data,
			}),
		}),

		getRechargeOptions: builder.query({
			query: () => ({
				url: `/game/recharge-options`,
			}),
		}),

		rechargeByPoints: builder.mutation({
			query: ({ data }) => ({
				url: `/game/bonus-points-recharge`,
				method: 'POST',
				body: data,
			}),
		}),

		getBuyPointOptions: builder.query({
			query: () => ({
				url: `/game/buy-points-options`,
			}),
		}),

		bkashPaymentForGameBuyPoints: builder.mutation({
			query: ({ data }) => ({
				url: `/game/bkash`,
				method: 'POST',
				body: data,
			}),
		}),

		gamePointBkashPaymentExecute: builder.mutation({
			query: ({ data }) => ({
				url: `/game/bkash-execute`,
				method: 'POST',
				body: data,
			}),
		}),

		getShowBonusPoints: builder.query({
			query: (isGetData) => ({
				url: `/game/show-bonus-points/${isGetData}`,
			}),
		}),
		getSpecialNotification: builder.query({
			query: () => ({
				url: `/global/special-notification`,
			}),
		}),
		getUserVouchers: builder.query({
			query: () => ({
				url: `/user/user-vouchers`,
			}),
		}),


		


	}),
});

export const {
	useCreateUserMutation,
	useVerifiedOtpMutation,
	useResendOtpMutation,
	useLoginMutation,
	useForgotPasswordMutation,
	useChangePasswordMutation,
	useChangePasswordFromModalMutation,
	useGetAllMarketsValueQuery,
	useGetDsexValueQuery,
	useGetSingleMarketValueQuery,
	useGetGlobalInfoQuery,
	useGetOnboardingOptionsQuery,
	useGetUserInfoQuery,
	useGetUserImageQuery,
	useGetOnboardingBanksQuery,
	useVerifiyNIDMutation,
	usePersonalInfoMutation,
	useNomineeNIDMutation,
	useConsentMutation,
	useBrokerMutation,
	useGetPortfolioValueQuery,
	usePersonalInfoDashboardMutation,
	useGetTransectionHistoryQuery,
	useGetBoPrefundWithdrawHistoryQuery,
	useBkashPaymentMutation,
	useBkashPaymentExecuteMutation,
	useOnlinePaymentMutation,
	useWithdrawPaymentMutation,
	useGetStockBuyRequestQuery,
	useGetOrderIdQuery,
	useGetStockSellRequestQuery,
	useSendEmailMutation,
	useVerifiyThematicInvestNIDMutation,
	useThematicNomineeNIDMutation,
	useThematicConsentMutation,
	useThematicBkashPaymentMutation,
	useThematicBkashPaymentExecuteMutation,
	useThematicOnlinePaymentMutation,
	useGetJommaVideosQuery,
	useGetGameStocksListQuery,
	useGetGamePortfolioTableValueQuery,
	useGetGamePortfolioValueQuery,
	useGetGameOrderIdQuery,
	useGetGameSellStocksListQuery,
	useRedeemedBonusPointsMutation,
	useGetBonusHistoryQuery,
	useSaveGameNameMutation,
	useGetBuyPointOptionsQuery,
	useBkashPaymentForGameBuyPointsMutation,
	useGamePointBkashPaymentExecuteMutation,
	useGetShowBonusPointsQuery,
	usePaymentBkashMutation,
	usePaymentExecuteBkashMutation,
	useSkipPaymentMutation,
	useGetIpoListQuery,
	useJoinIpoMutation,
	useManualVerifiyNIDMutation,
	useManualNomineeNIDMutation,
	useGetRechargeOptionsQuery,
	useRechargeByPointsMutation,
	useGetSpecialNotificationQuery,
	useVerifiyThematicInvestManualNIDMutation,
	useThematicManualNomineeNIDMutation,
	useGetUserVouchersQuery
} = apiSlice;
