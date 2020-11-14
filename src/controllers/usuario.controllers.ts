import { Request, Response } from "express";
import pool from '../datebase';
import bcrypt from 'bcryptjs';
import Token from "../clases/token";
// const mariadb = require('mariadb');

export const crearUsuario = async (req: Request, res: Response) => {
    let conn;
    const envio = {
        ok: true,
        aviso: "Usuario Registrado"
    }
    try {
        conn = await pool.getConnection();
        const usuario = {
            cedula:req.body.cedula,
            empresa:req.body.empresa,
            contraseña:bcrypt.hashSync(req.body.contraseña,10),
            nombre:req.body.nombre,
            apellido:req.body.apellido,
            estado:req.body.estado
        };
        const rows = await conn.query("INSERT INTO usuario (usu_cedula, emp_nit, usu_clave, usu_nombre, usu_apellido, usu_estado) VALUES (?, ?, ?, ?, ?, ?)", [usuario.cedula,usuario.empresa,usuario.contraseña,usuario.nombre,usuario.apellido, usuario.estado]);
        conn.end();
        return res.json(envio)
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
}

export const Login = async (req: Request, res: Response) => {
    let conn;
    let envio = {};
    try {
        conn = await pool.getConnection();
        const usuario = {
            cedula:req.body.cedula,
            contraseña:req.body.contraseña,
        };
        const rows = await conn.query("SELECT usu_clave FROM usuario WHERE usu_cedula = ?", usuario.cedula);
        const datos = JSON.parse(JSON.stringify(rows));;
        const clave = datos[0].usu_clave;
         if(bcrypt.compareSync(usuario.contraseña,clave)){
            const miToken = Token.getToken({
                nombre: usuario.cedula,
                password: usuario.contraseña
            });
            res.json({
                ok: true,
                aviso: "Login valido",
                token: miToken
            }); 
         }else{
             envio ={
                 ok: false,
                 aviso: "Datos invalidos"
             }
         }
        conn.end();
        return res.json(envio)
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
}

// usuarioRutas.post('/crear', (req: Request, res: Response) => {
    // SELECT `usu_cedula`, `emp_nit`, `usu_clave`, `usu_nombre`, `usu_apellido`, `usu_estado` FROM `db_conciliacion`.`usuario` WHERE  `usu_cedula`=1090511673;
//     const usuario = {
//         nombre: req.body.nombre,
//         password: bcrypt.hashSync(req.body.password, 10)
//  };
 
//      //Grabar Usuario en DB
//      Usuario.create(usuario).
//         then(usuarioDB => {
//             res.json({
//                 ok: true,
//                 usuario: usuarioDB
//             });
//         })
//          .catch(err => {
//             res.json({
//                 ok: false,
//                 err
//             })
//         });
//  });