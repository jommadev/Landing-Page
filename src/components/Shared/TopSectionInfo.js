import { formatNumberWithCommasAndDecimal } from '@/utils/formatNumberWithCommasAndDecimal';
import { useEffect, useRef, useState } from 'react';

const TopSectionInfo = ({ item }) => {
	return (
		<>
			<div className="py-2">
				<div
					className="indexs-info"
					style={{
						backgroundColor:
							item?.MONTH_TO_DATE === 0
								? null
								: item?.MONTH_TO_DATE > 0
								? '#D7EAD4'
								: '#F7CFCF',
					}}
				>
					<div
						className="d-flex justify-content-between align-items-center mb-1"
					>
						<p className="mb-0 tread-code">{item?.TRADE_CODE}</p>
						<p
							className="mb-0 top-section-value-color tread-code"
							style={{
								color:
									item?.MONTH_TO_DATE === 0
										? null
										: item?.MONTH_TO_DATE > 0
										? '#389429'
										: '#D60D0D',
							}}
						>
							{formatNumberWithCommasAndDecimal(item?.MONTH_TO_DATE)}%
						</p>
					</div>
					<div
						className="d-flex justify-content-between align-items-center"
					>
						<p className="mb-0">
							{formatNumberWithCommasAndDecimal(item?.CURRENT_PRICE)}
						</p>
						{item?.DIFFERENCE_AMOUNT && (
							<p
								className="mb-0 top-section-value-color"
								style={{
									color:
										item?.DIFFERENCE_AMOUNT === 0
											? null
											: item?.DIFFERENCE_AMOUNT > 0
											? '#389429'
											: '#D60D0D',
								}}
							>
								{formatNumberWithCommasAndDecimal(item?.DIFFERENCE_AMOUNT)}
							</p>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default TopSectionInfo;
