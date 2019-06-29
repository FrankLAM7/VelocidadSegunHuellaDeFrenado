$(document).ready(function(){

	// Create a jqxMenu
    $("#jqxMenu").jqxMenu({ width: '220', mode: 'vertical'});
    $("#jqxMenu").css('visibility', 'visible');

	$("#vel_ms").text("m/s : "); 
	$("#vel_kmh").text("km/h : ");
	$("#dtr").text("DTR : ");

	var sub_ch = false;
	var baj_ch = false;

	var source = [
		"Activar"
	];
	  // Create a jqxListBox
    $("#listbox").jqxListBox({width: 100, source: source, checkboxes: true, height: 30});
	
    $("#listbox").on('checkChange', function (event) {
                    var args = event.args;
                    if (args.checked) {
                        $("#rbSubida").jqxRadioButton({disabled: false});
                        $("#rbBajada").jqxRadioButton({disabled: false});
                    }
                    else {
                        $("#rbSubida").jqxRadioButton({disabled: true});
                        $("#rbBajada").jqxRadioButton({disabled: true});
                        console.log("entro");
                        $("#sub").css("display", "none");
                        $("#baj").css("display", "none");
                    }

                    });


	//-------------VELOCIMETRO-----------//
	$('#gaugeContainer').jqxGauge({
                ranges: [{ startValue: 0, endValue: 55, style: { fill: '#4bb648', stroke: '#4bb648' }, endWidth: 5, startWidth: 1 },
                         { startValue: 55, endValue: 110, style: { fill: '#fbd109', stroke: '#fbd109' }, endWidth: 10, startWidth: 5 },
                         { startValue: 110, endValue: 165, style: { fill: '#ff8000', stroke: '#ff8000' }, endWidth: 13, startWidth: 10 },
                         { startValue: 165, endValue: 220, style: { fill: '#e02629', stroke: '#e02629' }, endWidth: 16, startWidth: 13 }],
                ticksMinor: { interval: 5, size: '5%' },
                ticksMajor: { interval: 10, size: '9%' },
                value: 0,
                colorScheme: 'scheme05',
                animationDuration: 1200
            });

	//--------------RadioButton-----------//
	 		$("#rbSubida").jqxRadioButton({ width: 250, height: 25, disabled: true});
            $("#rbBajada").jqxRadioButton({ width: 250, height: 25, disabled: true});

               
            var clearLog = function () {
                var log = $('#events').find('span');
                if (log.length >= 2) {
                    log.remove();
                }
            }
            $("#rbSubida").on('change', function (event) {
                clearLog();
                var checked = event.args.checked;
                if (checked) {

                    //$("#events").prepend('<div><span>Checked: 12 Months Contract</span></div>');
                	$("#sub").css("display", "block");
                	$("#baj").css("display", "none");
                	$("#rbSubida").css("float", "left");
                	
                }
                else $("#events").prepend('<div><span>Unchecked: 12 Months Contract</span></div>');

                sub_ch = true;
                baj_ch = false;
                $("#baj").val('0');
                
            });
            $("#rbBajada").on('change', function (event) {
                clearLog();
                var checked = event.args.checked;
                if (checked) {
                	$("#baj").css("display", "block");
                   $("#sub").css("display", "none");
                   $("#rbBajada").css("float", "left");
                	
                }
                else $("#events").prepend('<div><span>Unchecked: 6 Months Contract</span></div>');
                
                sub_ch = false;
                baj_ch = true;
                $("#sub").val('0');
                
            });
           

    //-------------------------------------//
	$("#calcular").click(function(e){
        e.preventDefault();
		var cf = $("#cf");
		var lh = $("#lh");
		var subida = $("#sub");
		var bajada = $("#baj");
		var respuesta = 0;
		if(sub_ch && subida.val() != "" && subida.val() != 0){
			console.log("subida");
			respuesta = (15.9 * Math.sqrt((cf.val()+subida.val())*lh.val()));
		} else if(baj_ch && bajada.val() != "" && bajada.val() != 0 ){
			respuesta = (15.9 * Math.sqrt((cf.val()-bajada.val())*lh.val()));
			console.log("bajada");
		}else{
			respuesta = ((Math.sqrt(cf.val()*lh.val()))*15.9);
			console.log("Normal");
		}
		/*
		if(subida.val() == "" || subida.val() == 0){
			console.log("entraste");
			respuesta = (15.9 * Math.sqrt(cf.val()*lh.val()));
		}else{
			respuesta = (15.9 * Math.sqrt((cf.val()+subida.val())*lh.val()));
		}

		if(bajada.val() == "" || bajada.val() == 0){
				respuesta = (15.9 * Math.sqrt(cf.val()*lh.val()));
		}else{
				respuesta = (15.9 * Math.sqrt((cf.val()-bajada.val())*lh.val()));
		}*/
		
		var metros = respuesta/3.6;
		var kilometros = respuesta;
		var dtr = metros * 0.75;

		console.log(respuesta);
		$("#vel_ms").text("m/s : "+metros);
		$("#vel_kmh").text("km/h : "+kilometros);
		$("#dtr").text("DTR : "+ dtr);

			//-------------JQWIDGETS-----------//
			

		
            $('#gaugeContainer').on('valueChanging', function (e) {
                $('#gaugeValue').text(Math.round(e.args.value) + ' kph');
            });
            $('#gaugeContainer').jqxGauge('value', respuesta);
           
	});



	
});
