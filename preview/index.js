const vm = new Mvvm({
	el: '#app',
	data: {
		name: 'Jef xie',
		vhtml: '<p>vhtml</p>',
		msg: 'hello'
    },
    computed:{
        cmp(){
            return this.name + this.msg;
        }
    },
    created() {
        console.log('created', this.msg)
    },
    mounted() {
        console.log('mounted', this.name)
    },
    methods:{
        sayHi(){
            this.name = Math.random().toString().slice(2);
        }
    }
});
