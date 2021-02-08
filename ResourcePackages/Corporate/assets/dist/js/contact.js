// var noConflictjQuery = noConflictjQuery || jQuery.noConflict();
(function ($) {
    $(function () {
        'use strict';


        if (window.BNPtoolbox) {
            window.BNPtoolbox.contact = {

                // ========= PUBLIC ==========
                // ===========================

                initialize: function initialize() {
                    this.setInitVariable();

                    // Bind contact form
                    this.bindContactFormValidation();

                    // Check if the content block below contact form must be hide or not
                    this.checkContactContentBlock();
                },

                // ========= PRIVATE =========
                // ===========================

                // General variables, NOT page specific
                setInitVariable: function setInitVariable() {
                    // Toolbox ref
                    this.toolbox = window.BNPtoolbox;
                    // Contact form
                },
                bindContactFormValidation: function bindContactFormValidation() {

                    function validateEmail(email) {
                        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        return re.test(email);
                    }

                    $("#mobileMenu select").change(function () {
                        var selected = "", selectedRadio;
                        $("select option:selected").each(function (k, v) {
                            selected = parseInt(v.value);
                        });
                        selectedRadio = $(".ui-tab-radio-container td input[type=radio]")[selected];

                        selectedRadio.checked = true;
                    });

                    //form submit script

                    $(".ui-error-popup .close").click(function () {
                        $('.ui-error-popup, .ui-mask').removeClass("show");
                    });

                    $(".ui-form input, .ui-form textarea").click(function () {
                        if ($(this).hasClass('error')) {
                            $(this).removeClass('error');
                            $(this).attr('placeholder', $(this).attr('data-orig-placeholder'));
                        }
                    });

                    $(".ui-form .ui-button input").click(function (e) {

                        $('.error').removeClass('error');
                        $('.ui-error-popup h2').html("");
                        var errorEmpty = false, errorMail = false;
                        //validate the form
                        $(".ui-form input[type=text], .ui-textarea").each(function (k, v) {
                            if ($(v).val().length == 0) {
                                $(v).addClass('error');
                                errorEmpty = true;
                                //add the new error message
                                $(v).attr('placeholder', $(v).attr('data-errormessage'));
                            } else {
                                if ($(this).hasClass('email')) {
                                    if (!validateEmail($(v).val()) && $(v).val().length > 0) {
                                        $(v).addClass('error');
                                        errorMail = true;
                                        $(v).val('');
                                        $(v).attr('placeholder', $(v).attr('data-errormessage-email'));
                                    }
                                }
                            }
                        });
                        
                        if (errorEmpty) {
                            $(".required-label").addClass("show");
                        }
                        if (errorEmpty == false && errorMail == false) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    });

                    // $('#dContactForm').validate({
                    //     submitHandler: function(form) {

                    //         // $('#modalNewsLetterSuccess').modal();

                    //         console.log("success");

                    //         //SubscribeToNewsAlerts("@Thread.CurrentThread.CurrentUICulture.TwoLetterISOLanguageName.ToLower()", $("#NR_NewsAlert_FirstName").val(), $("#NR_NewsAlert_LastName").val(), $("#NR_NewsAlert_Email").val(), $("#NR_NewsAlert_Company").val(), $("#NR_NewsAlert_Function").val(), JSON.stringify(newsAlertThemes));
                    //     },
                    //     onfocusout: function (element) {
                    //         $(element).valid();
                    //     },
                    //     rules: {
                    //         ctl00$ContentPlaceHolder$C001$ctl00$ctl00$tbName: 'required',
                    //         ctl00$ContentPlaceHolder$C001$ctl00$ctl00$tbFirstName: 'required',
                    //         ctl00$ContentPlaceHolder$C001$ctl00$ctl00$tbEmail: {
                    //             required: true,
                    //             email: true
                    //         },
                    //         ctl00$ContentPlaceHolder$C001$ctl00$ctl00$tbSubject: 'required',
                    //         ctl00$ContentPlaceHolder$C001$ctl00$ctl00$tbMessage: 'required'
                    //     },
                    //     errorPlacement: function(error, element) {
                    //         element.parent().addClass('error');
                    //     },
                    //     highlight: function(element, errorClass, validClass) {
                    //         $(element).parent().addClass(errorClass);
                    //         $(element).addClass(errorClass);
                    //         $(element).removeClass(validClass);
                    //     },
                    //     unhighlight: function(element, errorClass, validClass) {
                    //         $(element).parent().removeClass(errorClass);
                    //         $(element).removeClass(errorClass);
                    //         $(element).addClass(validClass);
                    //     }
                    // });
                },
                checkContactContentBlock: function checkContactContentBlock() {
                    if(!$(".dContactForm").is(':visible')){
                        $(".main-content .sfContentBlock").hide();
                    }
                }
            };
            window.BNPtoolbox.contact.initialize();
        } else {
            //console.log("HBtoolbox doesn't exist!");
        }
    });
})(jQuery);
