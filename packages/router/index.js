export class Router {
    constructor(mode){
        this.curURL = ''
        this.routes = new Map()
        this.refresh = function(){
            console.log('cccc')
            this.curURL = location.hash.slice(1) || '/'
            if(this.routes.get(this.curURL)){
                this.routes.get(this.curURL)()
            }            
        }
        this.init = function(){
            if(mode === 'hash'){
                window.addEventListener('load',this.refresh.bind(this))
                window.addEventListener('hashchange',this.refresh.bind(this))
            }
        }
        this.route = function(path,callback){
            this.routes.set(path,callback || function(){})
        }
    }
    
}
