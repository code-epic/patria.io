let _ANOACTUAL = new Date().getUTCFullYear();

let FrmValidar = false;
let Usuario = {};
class Menu {
  constructor() { }
  ValidarPrivilegio(Json) {
    var Menu = Json.perfil.privilegio;
  }
  //Crear Menu Dinamicamente
  Crear(Json) {

    const tk = Json[0].Aplicacion[0].Rol.Menu
    if (sessionStorage.getItem('menu') == undefined) {
      sessionStorage.setItem('menu', JSON.stringify(tk))
      const texto = MD5(JSON.stringify(tk));
      sessionStorage.setItem('crypt', texto);
    }
    this.regenerarToken(tk);
  }

  regenerarToken(Mnu) {

    var cadena = "<li class='header'>Menu</li>";
    cadena += `<li><a href="./starter.html"><i class="fa fa-home"></i><span>Principal</span></a></li>`;
    if (Mnu != undefined) {
      Mnu.forEach(v => {
        cadena += `<li>
              <a href="#" onclick="CargarUrl('_cuerpo','${v.url}');${v.js}"><i class="${v.icono}"></i><span>${v.nombre}</span></a>
            </li>`;
      });
      $('#_menu').html(cadena);
    } else {
      console.log("No existen menus asociados a las cuentas.");
    }
    verificarPrivilegioUsuario();
  }
}

class Estado {
  constructor() {

  }
  Crear(Json) {
    if (sessionStorage.getItem('patriaEstado') == undefined) {
      sessionStorage.setItem('patriaEstado', JSON.stringify(Json.Cuerpo));
    }
  }
  ObtenerEstados() {
    let estado = JSON.parse(sessionStorage.getItem('patriaEstado'));

    $("#cmbmestado").html('<option value="S" selected="selected"></option>');
    $("#cmbestadof").html('<option value="S" selected="selected"></option>');
    $("#cmbestadom").html('<option value="S" selected="selected"></option>');
    estado.forEach(v => {
      $("#cmbmestado").append(`<option value="${v.codigo}">${v.nombre}</option>`);
      $("#cmbestadof").append(`<option value="${v.codigo}">${v.nombre}</option>`);
      $("#cmbestadom").append(`<option value="${v.codigo}">${v.nombre}</option>`);
    });

  }
  ObtenerCiudadMunicipio(estado, nombre) {
    var sciudad = 'cmbmciudad';
    var smunicipio = 'cmbmmunicipio';
    if (nombre != undefined) {
      sciudad = 'cmbciudad' + nombre;
      smunicipio = 'cmbmunicipio' + nombre;
    }
    var cm = JSON.parse(sessionStorage.getItem('patriaEstado')); //CiudadMunicipio
    $.each(cm, function (c, v) {
      if (v.codigo == estado) {

        let ciudad = v.ciudad;
        let municipio = v.municipio;
        $("#" + sciudad).html('<option value="S" selected="selected"></option>');
        $("#" + smunicipio).html('<option value="S" selected="selected"></option>');
        $.each(ciudad, function (c, v) {
          $("#" + sciudad).append('<option value="' + v.nombre + '">' + v.nombre + '</option>');
        });
        $.each(municipio, function (c, v) {
          $("#" + smunicipio).append('<option value="' + v.nombre + '">' + v.nombre + '</option>');
        });
      }
    });
  }
  ObtenerParroquia(estado, municipio, nombre) {
    var sparroquia = 'cmbmparroquia';
    if (nombre != undefined) {
      sparroquia = 'cmbparroquiaf';
    }
    var cm = JSON.parse(sessionStorage.getItem('patriaEstado')); //CiudadMunicipio
    $.each(cm, function (c, v) {
      if (v.codigo == estado) {
        var mun = v.municipio;
        $.each(mun, function (c, v) {
          if (v.nombre == municipio) {
            $("#" + sparroquia).html('<option value="S"></option>');
            $.each(v.parroquia, function (cl, vl) {
              $("#" + sparroquia).append('<option value="' + vl + '">' + vl + '</option>');
            });
          }
        });
      }
    });
  }
}

var Mnu = new Menu();
var Conn = new Conexion();
var Util = new Utilidad();
var Estados = new Estado();

$(function () {
  var xAPI = {
    'funcion': 'ListarPaises',
    'parametros': '',
    'valores': ''
  }
  CargarAPI(Conn.URL + Conn.IDHash, "POST", xAPI, Estados);
  CargarUrl("_bxBuscar", "afi/buscar");
  CargarUrl("_bxTarjeta", "afi/tarjeta");
  CargarUrl("_bxDatoBasico", "afi/datobasico");
  CargarUrl("_bxMedidaJudicial", "afi/medidajudicial");
  // CargarUrl("_bxCredito", "afi/credito");

  CargarUrl("_frmCreditoPrestamo", "afi/creditofrm");

  CargarUrl("_stepper", "afi/medidajudicialfrm");
  // CargarUrl("_stepperCredito", "cre/stepcredito");
  // CargarUrl("_stepperPrestamo", "cre/stepsolicitud");
  CargarUrl("_bxDescuentos", "afi/descuentos");

  CargarUrl("_decuentos", "afi/descuentosfrm");

  CargarUrl("_bxDatosFamiliar", "afi/familiar");
  CargarUrl("_bxTarjetaFamiliar", "afi/tarjetafamiliar");
  CargarUrl("_boxModFamiliares", "afi/modalfamiliares");

  CargarUrl("_contenidofamiliar", "afi/familiarmodalcontinuar");
  CargarUrl("_contenidoh", "afi/historicomilitar");
  CargarUrl("_contenidorpt", "rpt/constancia");
  // CargarUrl("_contenidocps", "rpt/constanciapensionsobr");
  // CargarUrl("_objectPDF", "rpt/carnet");
  // CargarUrl("_objectPDF2", "rpt/carnetfamiliar");

  CargarUrl("_bxContenedores", "afi/contenedores");

  CargarUrl("_hojaderuta", "rpt/hojaderuta");
  CargarUrl("_hojadesolvencia", "rpt/hojadesolvencia");
  // CargarUrl("_autorizaciontratamiento", "rpt/autorizaciontratamiento");
  // CargarUrl("_constanciafaov", "rpt/constanciafaov");
  // CargarUrl("_constanciacredito", "rpt/constanciacredito");
  // CargarUrl("_constanciafideicomiso", "rpt/constanciafideicomiso");
  // CargarUrl("_constanciapensionado", "rpt/constanciapensionado");
  // CargarUrl("_constanciapensionadosobre", "rpt/constanciapensionsobr");
  // CargarUrl("_rptprestamos", "cre/rptprestamo");







  $("#salvar").hide();
  $('#modMsj').on('shown.bs.modal', function () {
    $('#_aceptar').focus();
  });

  IniciarSesion();

});

function verificarPrivilegioUsuario() {
  const mnu = sessionStorage.getItem('menu');
  if (sessionStorage.getItem('crypt') == MD5(mnu)) {
    const tk = JSON.parse(sessionStorage.getItem('menu')); 
    tk.forEach(e => {
      e.Privilegios.forEach(P => {
        $(`.${P.clase}`).attr("disabled", false);
        $(`.${P.clase}`).removeClass('hide');
      })
    });
  }
}



function Principal() {
  $(location).attr("href", "starter.html");
}

function Enter(e, obj) {
  if (e.keyCode == 13) {
    Buscar();
  }
  return Util.SoloNumero(e, obj.id);
}

function CiudadMunicipio(valor) {
  if (valor == undefined) {
    Estados.ObtenerCiudadMunicipio($("#cmbmestado option:selected").val());
  } else if (valor == 1) {
    Estados.ObtenerCiudadMunicipio($("#cmbestadof option:selected").val(), "f");
  } else {
    Estados.ObtenerCiudadMunicipio($("#cmbestadom option:selected").val(), "m");
  }
}
function SeleccionarParroquia(valor) {
  if (valor == undefined) {
    Estados.ObtenerParroquia($("#cmbmestado option:selected").val(), $("#cmbmmunicipio option:selected").val());
  } else {
    Estados.ObtenerParroquia($("#cmbestadof option:selected").val(), $("#cmbmunicipiof option:selected").val(), true);
  }
}

function CargarUrl(id, url) {
  var xhttp = new XMLHttpRequest();
  xhttp.open('GET', 'inc/' + url + '.html');
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      $('#' + id).html(xhttp.responseText);
    }
  };
  xhttp.onerror = function () {
    if (this.readyState == 4 && this.status == 0) {
      $.notify("El archivo no ha sido encontrado");
    }

  };
  xhttp.send();
}

function GestionarUsuario() {
  CargarUrl("_cuerpo", "usuario")
}


function Editar() {
  $('#modMsj').modal('show');
}

function HistoricoMilitar() {
  $('#modHistoricoMilitar').modal('show');
}

function HistoriaClinica() {
  $('#modDocumentClinico').modal('show');
}

function readURL(input, id) {
  var archivo = input.files[0];
  bFile = 0;
  type = 'image.*';
  if (archivo.size < 1000000) {
    if (input.files && input.files[0]) {
      if (!archivo.type.match(type)) {
        $.notify('El formato de archivo debe ser: (' + type + ')');
        limpiarObjetos(input, id);
        return false;
      }
      $("#load" + id).show();
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#' + id).attr('src', e.target.result);
        bFile = 1;
      };
      reader.readAsDataURL(input.files[0]);
      $("#load" + id).hide();
    }
  } else {
    limpiarObjetos(input, id);
    $.notify('No se puede subir un archivo mayor a 1 MB');
  }
}


function limpiarObjetos(input, id) {
  input.value = "";
  $('#view-' + id).html('<img style="width: 140px;height: 140px; margin-left: 0px" class="file-path-wrapper-pre-view" id="pre-view-' + id + '" />');
}

function soloLetras(e) {
  key = e.keyCode || e.which;
  tecla = String.fromCharCode(key).toLowerCase();
  letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
  especiales = [8, 37, 39, 46];

  tecla_especial = false
  for (var i in especiales) {
    if (key == especiales[i]) {
      tecla_especial = true;
      break;
    }
  }
  if (letras.indexOf(tecla) == -1 && !tecla_especial)
    return false;
}

function IniciarSesion() {
  if (sessionStorage.getItem('patria.IO') != undefined) {
    var e = sessionStorage.getItem("patria.IO");
    var s = e.split(".");
    var json = JSON.parse(atob(s[1]));
    Usuario = json.Usuario;

    $("#_PerfilUsuario").html(Usuario.Perfil.descripcion);
    $("#_NombreUsuario").html(Usuario.nombre);
    let parametros = `${Usuario.cedula},patria.io,${Usuario.correo}`

    var xAPI = {
      'funcion': '_SYS_CUsuarioPerfil',
      'parametros': parametros,
      'valores': ''
    }
    CargarAPI(Conn.URL + Conn.IDHash, "POST", xAPI, Mnu);


  }
}


/**
 * Listar Carnet's
 *
 **/
function ListarCarnet(estatus) {
  listaCarnet = new LstCarnet();
  Estatus = estatus;
  var ruta = Conn.URL + "carnet/listar/" + estatus;
  CargarAPI(ruta, "GET", "", listaCarnet);
}


/**
 * Listar Carnet's
 *
 **/
function Estadisticas() {
  CargarUrl("_cuerpo", "afi/estadistica")
}

/**
 * CargarAPIPromesa
 *
 **/
function CargarAPIPromesa(options) {
  var xhttp = new XMLHttpRequest();
  xhttp.open(options.metodo, options.sURL);
  xhttp.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('patria.IO'));
  var promise = new Promise(function (resolve, reject) {
    xhttp.addEventListener('readystatechange', function () {

      if (xhttp.readyState === 4 && xhttp.status === 200) {
        if (options.Objeto != undefined) {
          options.Objeto = JSON.parse(xhttp.responseText);
        }
        resolve(xhttp);
      }
      if (xhttp.status === 401) {
        if (xhttp.responseText != "") {
          respuesta = JSON.parse(xhttp.responseText);
          $.notify(respuesta.msj);
        }
      }
    });

    xhttp.addEventListener('error', function () {
      if (xhttp.responseText != "") {
        respuesta = JSON.parse(xhttp.responseText);
        if (respuesta.tipo != 0) {
          $.notify("Se ha Insertado correctamente", "success");
        } else {
          alert(xhttp.responseText);
        }
      }
      reject(xhttp);
    });
  });

  if (options.valores != undefined) {
    xhttp.send(JSON.stringify(options.valores));
  } else {
    xhttp.send();
  }

  return promise;
}


function Conceptos() {
  $("#ModuloTitulo").html("Conceptos");
  ActualizarConcepto();

}

function PrepararNomina() {

  CargarUrl("_stepper", "afi/nominafrm");
  $("#ModuloTitulo").html("Nómina");
  ContarPensionados();

}

function PrepararCalculadora() {
  CargarUrl("_cuerpo", "afi/calculadora");
  $("#ModuloTitulo").html("Calculadora");
}



function ReporteFinanza() {
  // var lst = new WListarPendientes();
  $("#ModuloTitulo").html("&nbsp;&nbsp;&nbsp;&nbsp;Ver nóminas pendientes");
  // var ruta =  Conn.URL + "nomina/listarpendientes/4";
  // CargarAPI(ruta, "GET", lst, lst);
}

function PrepararRechazos() {
  CargarUrl("_divrechazos", "fin/rechazosfrm")
  $("#ModuloTitulo").html("Rechazos Bancarios");
  ListarNominasPagadas();

}

function PrepararOtrosPagos() {
  CargarUrl("_cuerpo", "fin/otospagos");
  $("#ModuloTitulo").html("Otros pagos");
  ListarConceptosContables();
}





/**
 * Listar Carnet's
 *
 **/
function SolicitudCredito() {
  CargarUrl("_cuerpo", "cred/organigrama")
  $("#ModuloTitulo").html("Departamento de Crédito");
}


/**
 * Liberar Carnet's
 *
 **/
function LiberarCarnet() {
  $("#ModuloTitulo").html("Liberación de Carnet's");
}


/**
 * Envio de crédito por operaciones
 *
 **/
function CrCobranza() {
  CargarUrl("_rptcreditolst", "cre/listado");
  //Date range picker

  $("#ModuloTitulo").html("Envio de Cobranza");
}

function PrepararRetroactivo() {
  CargarUrl("_cuerpo", "afi/retroactivo");
  $("#ModuloTitulo").html("Pagar Retroactivo");
  ObtenerConceptosW();
}

function LiquidarCredito() {
  CargarUrl("_cuerpo", "fin/liquidar");
  $("#ModuloTitulo").html("Liquidar Créditos");
}

/**
 * Envio de crédito por operaciones
 *
 **/
function CobCobranza() {
  //CargarUrl("_rptcreditolst", "cob/listado");
  //Date range picker

  $("#ModuloTitulo").html("Listado de Creditos");
}

function CobGenerarTxt(id) {
  //CargarUrl("_rptcreditolst", "cob/listado");
  //Date range picker

  $("#ModuloTitulo").html("Envio de Cobranza Generar Txt");
}

function CobRelacionActiva(id) {

  $("#ModuloTitulo").html("Relación de Créditos Activos");

}
function CobRelacionPagados(id) {

  $("#ModuloTitulo").html("Relación de Créditos Pagados");

}
function CobAmortizaciones(id) {

  $("#ModuloTitulo").html("Amortizaciones de créditos");
}



function SISAReportesNomina() {
  CargarUrl("_cuerpo", "SISA/nominas");

  $("#ModuloTitulo").html("Nominas Mensuales");
}

function SISACargarDeducciones() {
  CargarUrl("_cuerpo", "SISA/subir");
  $("#ModuloTitulo").html("Cargar deducciones SISA");

}


function CerrarSession() {
  sessionStorage.clear();
  $(location).attr("href", "../index.html");
}



