import component from '@/locales/en-US/component';
import Icon from '@ant-design/icons';
import route from 'mock/route';
import path from 'path';

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
		path: '/TH4',
		name: 'Bai 4',
		icon: 'MenuUnfoldOutlined',
		component: './TH4/DiplomaBook',
	},
	{
		path: '/TH5',
		name: 'Bai 5',
		icon: 'MenuUnfoldOutlined',
		routes: [
			{
				name: 'CLUB',
				path: 'CLUB',
				component: './TH5/Club',
			},
			{
				name: 'TvCLUB',
				path: 'TvCLUB',
				component: './TH5/TvClub',
			},
			{
				name: 'XlsxCLUB',
				path: 'XlsxCLUB',
				component: './TH5/XLSX',
			},
		],
	},

	{
		path: '/todo',
		name: 'Todo',
		component: './Totolist',
		icon: 'CheckCircleOutlined',
	},
	{
		path: '/test',
		name: 'Test',
		component: './test',
		icon: 'MenuUnfoldOutlined',
	},
	{
		path: '/GK',
		name: 'GKBAI4',
		icon: 'MenuUnfoldOutlined',
		component: './GK', // Kiểm tra lại đường dẫn này
	},

	{
		path: '/question',
		name: 'Bai 2',
		icon: 'MenuUnfoldOutlined',
		routes: [
			{
				name: 'Danh mục khối kiến thức',
				path: 'DanhMucKhoiKienThuc',
				component: './TH2/DanhMucKhoiKienThuc',
			},
			{
				name: 'Subject',
				path: 'Subject',
				component: './TH2/subject',
			},
			{
				name: 'Question',
				path: 'Question',
				component: './TH2/question',
			},
			{
				name: 'exam',
				path: 'exam',
				component: './TH2/ExamQuetion',
			},
		],
	},

	{
		path: '/',
		component: './TH3/layouts', // Layout chính của ứng dụng
		icon: 'MenuUnfoldOutlined',
		name: 'Bai 3',
		routes: [{ path: '/booking', component: '@/pages/TH3/Booking' }],
	},
	{
		path: '/login',
		component: './TH3/Login',
		layout: false,
		Icon: 'MenuUnfoldOutlined',
		name: 'Bai 3',
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
