import { addRouterViews, RouterView } from "./component/RouterView"
 export class Router {
    constructor(option){
        let routesMap = new Map()
        for(var i of option.routes){
            
            let path = i.path
            let com = i.component
            addRouterViews(path,com)
            routesMap.set(path, () => {
                RouterView.currentPath.value = path
                console.log(path)
            })
        }
        this.curURL = ''    
        window.onload = function(){
            this.curURL = location.hash.slice(1)
            routesMap.get(this.curURL)()          
        } 
        window.addEventListener('hashchange',() => {
           this.curURL = location.hash.slice(1)
           routesMap.get(this.curURL)()
        })
    }
    
}

/* router.route('/',function(){
    RouterView.currentPath.value = '/'
    console.log('/')  
})
router.route('/menu',function(){
    RouterView.currentPath.value = '/menu'
    console.log('menu')
})

addRouterViews('/menu',Menu)
addRouterViews('/',Com) */
