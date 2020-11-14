import { Router } from 'express'
import  * as UsuarioCtrl from '../controllers/usuario.controllers'

const UsuarioRoter = Router()

UsuarioRoter.post('/crearUsuario',UsuarioCtrl.crearUsuario);
UsuarioRoter.post('/login',UsuarioCtrl.Login);

export default UsuarioRoter