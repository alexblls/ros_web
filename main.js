document.addEventListener('DOMContentLoaded', event => {
    console.log("entro en la pagina")
    
    document.getElementById("btn_con").addEventListener("click", connect)
    document.getElementById("btn_dis").addEventListener("click", disconnect)
    
    document.getElementById("btn_move").addEventListener("click", move)
    document.getElementById("btn_right").addEventListener("click", right)
    document.getElementById("btn_stop").addEventListener("click", stop)
    
    document.getElementById("btn_delante").addEventListener("click", () => {
        call_delante_service("delante")
    })

    // document.getElementById("btn_Ibuprofeno").addEventListener("click", () => {
    //     call_delante_service("go_ibuprofeno")
    // })
    document.getElementById("btn_Ibuprofeno").addEventListener("click", go_ibuprofeno)


    // data = {
    //     // ros connection
    //     ros: null,
    //     // rosbridge_address: 'ws://127.0.0.1:9090/",
    //     rosbridge_address: document.getElementById("puerto").value,
    //     connected: false,
    // }

    posiciones = [[10,10],[10,20],[20,10],[20,20]];

    data = {
        // ros connection
        ros: null,
        rosbridge_address: 'ws://127.0.0.1:9090/',
        //rosbridge_address: document.getElementById("puerto").value,
        connected: false,
        // service information 
        service_busy: false, 
        service_response: ''
    }

    function connect(){
	      console.log("Clic en connect")
	
	      data.ros = new ROSLIB.Ros({
                url: data.rosbridge_address
        })

        // Define callbacks
        data.ros.on("connection", () => {
            data.connected = true
            console.log("Conexion con ROSBridge correcta")
        })
        data.ros.on("error", (error) => {
            console.log("Se ha producido algun error mientras se intentaba realizar la conexion")
            console.log(error)
        })
        data.ros.on("close", () => {
            data.connected = false
            console.log("Conexion con ROSBridge cerrada")	    	 
        })
    }

    function disconnect(){
	      data.ros.close()        
	      data.connected = false
        console.log('Clic en botón de desconexión')
    }    
    
    function move() {
        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/msg/Twist'
        })
        let message = new ROSLIB.Message({
            linear: {x: 0.1, y: 0, z: 0, },
            angular: {x: 0, y: 0, z: 0, },
        })
        topic.publish(message)
    }

    function right() {
        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/msg/Twist'
        })
        let message = new ROSLIB.Message({
            linear: {x: 0.1, y: 0, z: 0, },
            angular: {x: 0, y: 0, z: -0.2, },
        })
        topic.publish(message)
    }

    function stop() {
        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/msg/Twist'
        })
        let message = new ROSLIB.Message({
            linear: {x: 0, y: 0, z: 0, },
            angular: {x: 0, y: 0, z: 0, },
        })
        topic.publish(message)
    }

    function go_ibuprofeno() {
        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/goal_pose',
            messageType: 'geometry_msgs/pose'
        })
        let message = new ROSLIB.Message({
            header: {
                frame_id: "map"
            },
            pose: {
                position: {x: 3, y: -1, z: 0},
                orientation: {x: 0, y:0 , z:0, w: 0.0}
            }
        })
        topic.publish(message)
    }

//     header:
//   stamp:
//     sec: 0
//     nanosec: 0
//   frame_id: map
// pose:
//   position:
//     x: 0.8944292068481445
//     y: 2.1368610858917236
//     z: 0.0
//   orientation:
//     x: 0.0
//     y: 0.0
//     z: 0.9999562944252877
//     w: 0.0093492908419649



    // define the service to be called
    let service = new ROSLIB.Service({
        ros : ros,
        name : '/nombre_del_servicio',
        serviceType : 'rossrv/Type',
    })

    // define the request
    let request = new ROSLIB.ServiceRequest({
        param1 : 123,
        param2 : 'example of parameter',
    }) 

    // define a callback
    service.callService(request, (result) => {
        console.log('This is the response of the service ')
        console.log(result)
    }, (error) => {
        console.error(error)
    })

    function call_delante_service(valor){
        data.service_busy = true
        data.service_response = ''	
    
      //definimos los datos del servicio
        let service = new ROSLIB.Service({
            ros: data.ros,
            name: '/movement',
            serviceType: 'custom_interface/srv/MyMoveMsg'
        })
    
        let request = new ROSLIB.ServiceRequest({
            move: valor
        })
    
        service.callService(request, (result) => {
            data.service_busy = false
            data.service_response = JSON.stringify(result)
        }, (error) => {
            data.service_busy = false
            console.error(error)
        })	
    }






});
