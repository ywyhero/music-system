const CONFIG = {
	dev: {
		api: 'http://musicbook-qa.peilian.com/musicbook',
	},
	pre: {
		api: 'http://musicbook-pre.peilian.com/musicbook',
	},
	prod: {
		api: 'https://musicbook.peilian.com/musicbook'
	}
}

const host:string = window.location.host;
let apiHost:string = ''
if (host.includes('yuepu.dev.peilian.com')) {
	apiHost = CONFIG.dev.api
} else if (host.includes('yuepu.pre.peilian.com')) {
	apiHost = CONFIG.pre.api
} else if (host.includes('yuepu.peilian.com')) {
	apiHost = CONFIG.prod.api
} else {
	apiHost = CONFIG.dev.api
}
console.log(apiHost)
export default apiHost
