export function boProfileCompletion(journey_status) {
	if (journey_status === 1) {
		return 10;
	} else if (journey_status === 2) {
		return 15;
	} else if (journey_status === 3) {
		return 20;
	} else if (journey_status === 4) {
		return 40;
	} else if (journey_status === 5) {
		return 60;
	} else if (journey_status === 6) {
		return 80;
	} else if (journey_status === 7) {
		return 90;
	} else if (journey_status === 8) {
		return 100;
	} else if (journey_status === 0.5) {
		return 5;
	} else {
		return 0;
	}
}


export function redirectToPageBaseOnJS(router, journey_status) {
	if (journey_status === 1) {
		router.push('/onboarding/personal-information');
	} else if (journey_status === 2) {
		router.push('/onboarding/signature');
	} else if (journey_status === 3) {
		router.push('/onboarding/financial-information');
	} else if (journey_status === 4) {
		router.push('/onboarding/nominee');
	} else if (journey_status === 5) {
		router.push('/onboarding/consent');
	} else if (journey_status === 6) {
		router.push('/onboarding/broker');
	}  else if (journey_status === 0.5) {
		router.push('/onboarding/nid-image-upload');
	}  else if (journey_status === 7) {
		router.push('/onboarding/payment');
	} else {
		router.push('/onboarding/nid-verification');
	}
}
export function redirectToManualOnboardingPageBaseOnJS(router, journey_status) {
	if (journey_status === 1) {
		router.push('/onboarding-manual/personal-information');
	} else if (journey_status === 2) {
		router.push('/onboarding-manual/signature');
	} else if (journey_status === 3) {
		router.push('/onboarding-manual/financial-information');
	} else if (journey_status === 4) {
		router.push('/onboarding-manual/nominee');
	} else if (journey_status === 5) {
		router.push('/onboarding-manual/consent');
	} else if (journey_status === 6) {
		router.push('/onboarding-manual/broker');
	}  else if (journey_status === 0.5) {
		router.push('/onboarding-manual/nid-image-upload');
	}  else if (journey_status === 7) {
		router.push('/onboarding-manual/payment');
	}   else {
		router.push('/onboarding-manual/nid-verification');
	}
}


/* export function validationURL(router, journey_status, disable_onboarding, isManual = false) {
	switch (true) {
	  case disable_onboarding == 1:
			router.push('/home');
		break;
	  case journey_status >= 8:
			router.push('/home');
		break;
	  default:
	}
  } */
  export function validationURL(router, journey_status, disable_onboarding, isManual = false) {
	switch (true) {
	  case disable_onboarding == 1 && isManual:
		router.push('/home');
		break;
	  case disable_onboarding == 0 && isManual:
		router.push('/home');
		break;
	  case journey_status >= 8:
		router.push('/home');
		break;
	  default:
	}
  }
  export function validationInvestmentURL(router, thematic_journey_status, disable_onboarding, isManual = false) {
	switch (true) {
	  case disable_onboarding == 1 && isManual:
		router.push('/home');
		break;
	  case disable_onboarding == 0 && isManual:
		router.push('/home');
		break;
	  case thematic_journey_status >= 6:
		router.push('/home');
		break;
	  default:
	}
  }
  



