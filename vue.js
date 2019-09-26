Vue.filter('numberFormat', function(value) {
    return value.toLocaleString()
})

Vue.filter('toUSD', function(jpy) {
    return jpy / 100
})

Vue.filter('readMore', function(text, length, suffix) {
    return text.substring(0, length) + suffix
})

const app = new Vue({
    el: '#app',
    data: {
        message: 'Hello <span style="color:red;">Vue.js<span/>',
        list: '',
        todos: [],
        bpi: null,
        hasError: false,
        loading: true,
        number: 100,
        ok: true,
        price: 26000,
        jpyprice: 2900000,
        text: '授業がとても充実してる。みんなの意見が聞けるのが楽しいけど自分からは発言できなかった。たぶん、そうゆう教育を受けてきたから？',
        baseprice: 100,
        km: 0,
        m: 0,
        mm: 0,
        firstName: '',
        lastName: '',
        colors: [
            { name: 'red' },
            { name: 'green' },
            { name: 'blue' }
        ]
    },
    watch: {
        message: function(newValue, oldValue) {
            console.log("new: %s, old: %s", newValue, oldValue);
        },
        km: function(value) {
            this.km = value
            this.m = value * 1000
            this.mm = value * 1000000
        },
        m: function(value) {
            this.km = value / 1000
            this.m = value
            this.mm = value * 1000
        },
        mm: function(value) {
            this.km = value / 1000000
            this.m = value / 1000
            this.mm = value
        },
        colors: {
            handler: function(newValue, oldValue) {
                console.log('update')
            },
            deep: true
        }
    },
    methods: {
        addItem: function(event) {
            if (this.list == '') return;

            var todo = {
                item: this.list,
                isDone: false
            };

            this.todos.push(todo);
            this.list = '';

        },
        deleteItem: function(index) {
            this.todos.splice(index, 1);
        },
        clickhandler: function(event) {
            this.message = this.message.split('').reverse().join('')
        },
        rightnumber: function() {
            return Math.random()
        }
    },
    mounted: function() {
        axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
            .then(function(response) {
                this.bpi = response.data.bpi
                console.log(response.data.bpi)
                console.log(response.data.bpi.USD.rate_float)
            }.bind(this))
            .catch(function(error) {
                console.log(error)
                this.hasError = true
            }.bind(this))
            .finally(function() {
                this.loading = false
            }.bind(this))
    },
    filters: {
        currencyDecimal(value) {
            return value.toFixed(2)
        },
        // numberFormat: function(value) {
        //     return value.toLocaleString()
        // }
    },
    computed: {
        taxincludedprice: {
            get: function() {
                return parseInt(this.baseprice * 1.08)
            },
            set: function(taxincludedprice) {
                this.baseprice = Math.ceil(taxincludedprice / 1.08)
            }
        },
        computednumber: function() {
            return Math.random()
        },
        fullName: function() {
            return this.firstName + ' ' + this.lastName
        }
    }
})