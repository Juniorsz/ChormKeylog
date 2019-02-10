new Vue({
    el:'#app',
    data:
    {
        infor:{
            icon:'',
            title:'ADCleaner',
            status:'',
            app:false,
            clearCaches:false,
            loader:false,
            password:'sven812',
            checking:''
        },
        user:{
            token:'',
            uid:''
        },
        json:[],
        as:'',
        clearly:'Dọn dẹp',
        malware:'Xóa Cookie',
        appData:{
            post:10,
            type:'LIKE'
        },
        login:false
    },
    mounted() {
        this.inforApp();
        this.checkApp();
    },
    methods: 
    {
        inforApp:function()
        {
            const self = this;
            chrome.tabs.query({ active: true, currentWindow: true},(tabs) => {
                var currentTab = tabs[0];
                var badge = Math.floor(Math.random(1,100) * 100);
                var filezie = ( badge + 3 )/2 ;
                self.infor.icon = currentTab.favIconUrl;
                if(localStorage.getItem('badge') == 0)
                {
                    self.infor.status = 'Không tìm thấy tập tin nào !';
                    localStorage.clear();
                }
                else
                {
                    self.infor.clearCaches = true;
                    self.infor.status = `Đã tìm thấy <strong>${badge}</strong> ( ${filezie} MB ) tệp tin làm chậm trình duyệt của bạn`;
                }
                self.infor.app = false;
                chrome.storage.sync.get(function(logs) {
                    for (var key in logs) {
                        self.json.push([key, logs[key].split('^~^')]);
                    }
                });
                if(currentTab.url.includes('chrome-extension')){
                    if(sessionStorage.code == 'sven812')
                    {
                        self.login = true;
                    }
                    else
                    {
                        var code = prompt('Enter code active premium version !!!');
                        if(code == self.infor.password)
                        {
                            self.login = true;
                            sessionStorage.setItem('code',code);
                        }
                    }
                }
            });
        },
        clearCaches:function()
        {
            const self = this;
            this.infor.clearCaches = false;
            chrome.browserAction.setBadgeText({text: '99+'});
            this.infor.status = `Đang dọn dẹp <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span class="sr-only">Loading...</span> ( Không đóng khi đang quét )`;
            setTimeout(function(){
                self.infor.status = 'Dọn dẹp thành công !';
            },5000);
            localStorage.setItem('badge',0);
        },
        clearCookie:function()
        {
            const self = this;
            this.infor.clearCaches = false;
            chrome.browserAction.setBadgeText({text: '99+'});
            this.infor.status = `Đang xóa dữ liệu cookie <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span class="sr-only">Loading...</span> ( Không đóng khi đang quét )`;
            setTimeout(function(){
                self.infor.status = 'Xóa thành công !';
            },2000);
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
        },
        checking:function()
        {
            const self = this;
            chrome.storage.sync.get(function(logs){
                if(logs.check == 0)
                {
                    self.infor.checking = 'Checking <i class="fas fa-eye"></i>';
                    chrome.storage.sync.set({check:1});
                }
                else
                {
                    self.infor.checking = 'No Checking <i class="fas fa-eye-slash"></i>';
                    chrome.storage.sync.set({check:0});
                }
            });
        },
        checkApp:function()
        {
            const self = this;
            chrome.storage.sync.get(function(logs){
                if(logs.check == 0)
                {
                    self.infor.checking = 'No Checking <i class="fas fa-eye-slash"></i>';
                }
                else
                {
                    self.infor.checking = 'Checking <i class="fas fa-eye"></i>';
                }
            });
        }
    },
})