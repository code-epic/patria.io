let opciones = {
  'destroy': true,
  'paging': true,
  'lengthChange': true,
  'searching': false,
  'autoPrint': false,
  'ordering': false,
  'info': false,
  'autoWidth': false,
  "aLengthMenu": [[10, 25, 5, -1], [10, 25, 5, "Todo"]],
  "bStateSave": true,
  "language": {
    "lengthMenu": "Mostar _MENU_ filas por pagina",
    "zeroRecords": "Nada que mostrar",
    "info": "Mostrando _PAGE_ de _PAGES_",
    "infoEmpty": "No se encontro nada",
    "infoFiltered": "(filtered from _MAX_ total records)",
    "search": "Buscar",
    "paginate": {
      "first": "Primero",
      "last": "Ultimo",
      "next": "Siguiente",
      "previous": "Anterior"
    },
  },
}


let tablaBasica = {
  'paging': false,
  'lengthChange': false,
  'searching': false,
  'ordering': false,
  'info': false,
  'autoWidth': false
};

Number.prototype.zeroPadding = function () {
  var ret = "" + this.valueOf();
  return ret.length == 1 ? "0" + ret : ret;
};


let opcionesf = {
    destroy: true,
    'paging': false,
    'lengthChange': false,
    'searching': false,
    'ordering': false,
    'info': false,
    'autoWidth': false,
    "aLengthMenu": [[10, 25, 5, -1], [10, 25, 5, "Todo"]],
    "bStateSave": true,
    "language": {
        "lengthMenu": "Mostar _MENU_ filas por pagina",
        "zeroRecords": "Nada que mostrar",
        "info": "Mostrando _PAGE_ de _PAGES_",
        "infoEmpty": "No se encontro nada",
        "infoFiltered": "(filtered from _MAX_ total records)",
        "search": "Buscar",
        "paginate": {
            "first": "Primero",
            "last": "Ultimo",
            "next": "Siguiente",
            "previous": "Anterior"
        },
    },
}

let opcionesDire = {
    ordering: false,
    paging: false,          
    columnDefs: [ {
        orderable: false,
        className: 'select-checkbox',
        targets:   0
    } ],
    select: {
        style: 'multi'
    },
    scrollY:        300,
    deferRender:    true,
    scroller:       true,
    language: {
        "lengthMenu": "Mostar _MENU_ filas por pagina",
        "zeroRecords": "Nada que mostrar",
        "info": "Mostrando _PAGE_ de _PAGES_",
        "infoEmpty": "No se encontro nada",
        "infoFiltered": "(filtered from _MAX_ total records)",
        "search": "Buscar"
    }
};

let opcionesConceptos = {
    ordering: false,
    paging: false,            
    scrollY:        320,
    deferRender:    true,
    scroller:       true,
    language: {
        "lengthMenu": "Mostar _MENU_ filas por pagina",
        "zeroRecords": "Nada que mostrar",
        "info": "Mostrando _PAGE_ de _PAGES_",
        "infoEmpty": "No se encontro nada",
        "infoFiltered": "(filtered from _MAX_ total records)",
        "search": "Buscar"
    }
};
