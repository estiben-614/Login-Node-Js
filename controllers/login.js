import { generarJWT } from "../helpers/GenerarJWT.js"
import { googleVerify } from "../helpers/googleVerify.js"
import { userModel } from "../models/users.js"
import bcrypt from "bcrypt"

export const login=async(req,res)=>{
    //Recuperamos la info del body
    const dataBody=req.body

    //TODO: LOGIN GOOGLE
    //Si en esta info viene un token_id significa que el login es con login
    if(dataBody.token_id!==undefined){
        const {token_id}=req.body
        res.status(200).send({
            msg:'Todo Ok',
            token:token_id
        })
    
        
        //Decodificamos el token
        const data= await googleVerify(token_id)
    
        //Desestructuramos  info del token 
        const {email,name}=data
        //console.log(email,name)
    
        //TODO: Si quieremos guardar en DB el usuario autenticado con google 
        //Creamos el usuario con nuestro modelo de la DB
        // const usuario= new userModel({
        //     email:email,
        //     nombre:name
        // })
        // //Guardamos el usuario
        // usuario
        // .save()
    }
    //TODO: LOGIN MANUAL 
    //Si no viene el token_id es porque es un login manual y tiene el email y contraseña
    else{
        //recuperamos el email y la contraseña
        const {email,password}=req.body
        
        //Buscamos en la DB a un usuario que tenga ese email
        const usuarioEncontrado=await userModel.findOne({email})

        if(usuarioEncontrado){
                //Si encuentra un usuario, verifiquemos que las contraseñas coincidan
                const passwordCompare= await bcrypt.compare(password,usuarioEncontrado.password)
               
                //Si es son iguales
                if(passwordCompare){
                    
                    //Creamos el JWT con la info del usuario
                    const token=generarJWT({
                        nombre:usuarioEncontrado.nombre,
                        email:usuarioEncontrado.email,
                        usuario:usuarioEncontrado.usuario,
                        google:usuarioEncontrado.google
                    })

                    //console.log(token)
                    res.status(200).send({
                        msg: 'Login correcto',
                        token
                    })
                }

                else{
                
                    res.status(400).send({
                        msg:'La contraseña es incorrecta'
                    })
                }
        }

        //Si no encuentra un usuario
        else{
            
            res.status(400).send({
                msg:'El usuario no existe '
            })
                
        }
        
        
    }
   
}