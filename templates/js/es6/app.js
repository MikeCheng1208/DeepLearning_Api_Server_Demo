Vue.component('data-list', {
    props: ['resdatas'],
    template: `
        <ul>
            <li v-for="(obj,idx) in resdatas" :key="idx">
                <h2>{{obj.name}}</h2>
                <h3>相似度 {{obj.accurate}}%</h3>
            </li>
        </ul>
    `
})

new Vue({
    el: '#app',
    data:{
        imageData: 'https://picsum.photos/362',
        targetVal: null,
        loadingStatus: false,
        resData: [
            {
                id: null,
                name: "無樣本",
                accurate: "0"
            }
        ],
    },
    methods: {
        fileChange(e) {
            let input = e.target;
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.imageData = e.target.result;
                    this.submitDataImg();
                }
                reader.readAsDataURL(input.files[0]);
            }
        },
        submitDataImg() {
            let formData = new FormData();
            formData.append("img", this.imageData);
            this.loadingStatus = true;
            axios.post('/ai_api', formData).then(this.aiResFn)
        },
        aiResFn(res) {
            this.resData.length = 0;
            res.data.map(obj => {
                this.resData.push({
                    name: obj.name,
                    accurate: (Number(obj.accurate) * 100).toFixed(2)
                })
            })
            this.loadingStatus = false;
        }
    }
})