import { criarAdminPadrao } from "./utils/criarAdmin";
import { login } from "./cli/login";
import { mainMenu } from "./cli/menu";


criarAdminPadrao();

let usuarioLogado = login();
if (!usuarioLogado) process.exit(0);

mainMenu(usuarioLogado);
