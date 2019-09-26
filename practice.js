const app = new Vue({
    el: '#app',
    data: {
        items: null,
        keyword: '',
        message: '',
        isLogin: false,
        isLarge: true,
        isRed: true,
        text: 'text',
        textblue: 'text-blue',
        classObject: {
            new: true
        },
        font: 55,
        color: 'blue',
        styleObject: {
            color: 'red',
            fontSize: '91px'
        },
        toggle: true,
        counter: 0,
        checked: false
    },
    mounted: function() {
        // this.keyword = 'javascript'
        // this.getAnswer()
        this.debouncedGetAnswer = _.debounce(this.getAnswer, 1000)
    },
    methods: {
        getAnswer: function() {
            if (this.keyword === '') {
                this.items === null
                return
            }
            this.message = 'Loading...'
            const vm = this
            const params = { page: 1, per_page: 20, query: this.keyword }
            axios.get('http://qiita.com/api/v2/items', { params })
                .then(function(response) {
                    console.log(response)
                    vm.items = response.data
                })
                .catch(function(error) {
                    vm.message = 'error' + error
                })
                .finally(function() {
                    vm.message = ''
                })
        },
        clickHandler: function($event, message) {
            this.counter++
                console.log($event)
            this.message = message
        },
        clear: function() {
            this.message = ''
        }
    },
    watch: {
        keyword: function(newKeyword, oldKeyword) {
            this.message = 'waiting for you to stop typing...'
            this.debouncedGetAnswer()
        }
    }
})