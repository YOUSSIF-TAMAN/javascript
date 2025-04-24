export let deliveryOption = [{
	option: '1',
	priceCents: 0,
	days: 7
	
}, {
	option: '2',
	priceCents: 499,
	days: 3
	
}, {
	option: '3',
	priceCents: 999,
	days: 1
	}];



export function matchDeliveryOption(cartItem) {
	let matchDelOption;
    deliveryOption.forEach((option) => {
      if (option.option === cartItem.deliveryOption) {
        matchDelOption = option;
      }
	});
	return matchDelOption||deliveryOption[0];
}	