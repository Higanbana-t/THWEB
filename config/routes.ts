import component from "@/locales/en-US/component";
import path from "path";

export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},
	{
		path: '/todo',
		name: 'Todo',
		component: './Totolist',
		icon: 'CheckCircleOutlined',
	},
	{
		path:'/test',
		name:'Test',
		component:'./test',
		icon:'MenuUnfoldOutlined'
	},

	{
		path:'/question',
		name:'Bai 2',
		icon:'MenuUnfoldOutlined',
		routes:[
			{
			name:'Danh mục khối kiến thức',
			path:'DanhMucKhoiKienThuc',
			component:'./TH2/DanhMucKhoiKienThuc',


			},
			{
			name:'Subject',
			path:'Subject',
			component:'./TH2/subject',

			},
			{
			name:'Question',
			path:'Question',
			component:'./TH2/question',
			},
			{
				name:'exam',
				path:'exam',
				component:'./TH2/ExamQuetion',
			},

		],
	},

	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
];
