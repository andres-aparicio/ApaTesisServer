import { Request, Response } from "express";
import pool from '../datebase';
// const mariadb = require('mariadb');

export const crear = async (req: Request, res: Response) => {
    let conn;
    const envio = {
        aviso: "Empresa Registrada"
    }
    try {
        conn = await pool.getConnection();
        const {id, ciu, nombre, representante, direccion, correo, estado, telefono, coordinadora}= req.body;
        
        const rows = await conn.query("INSERT INTO empresa (emp_nit, ciu_id, emp_nombre, emp_nom_rep_legal, emp_direccion, emp_correo, emp_estado, emp_telefono, emp_coordinadora_financiera) VALUES (?,? ,? ,? , ?,? ,? ,? ,? )",[id,ciu,nombre,representante,direccion,correo,estado,telefono,coordinadora]);
        conn.end();
        return res.json(envio)
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
}

export const prueba = (req: Request, res: Response) => {
    const envio = {
        saludo: "hola"
    }
    console.log("hola")
    return res.json(envio)
}

