window.customalert = function(msg,title,cls) { bootbox.dialog({
  /**
   * @required String|Element
   */
  message: "<div class=\"modal-alert-icon\"></div>"+(msg||"Default message"),
  
  /**
   * @optional String|Element
   * adds a header to the dialog and places this text in an h4
   */
  //title: (title||"Default error"),
  
  /**
   * @optional Function
   * allows the user to dismisss the dialog by hitting ESC, which
   * will invoke this function
   */
  onEscape: function() {},
  
  /**
   * @optional Boolean
   * @default: true
   * whether the dialog should be shown immediately
   */
  show: true,
  
  /**
   * @optional Boolean
   * @default: true
   * whether the dialog should be have a backdrop or not
   */
  backdrop: true,
  
  /**
   * @optional Boolean
   * @default: true
   * show a close button
   */
  closeButton: true,
  
  /**
   * @optional Boolean
   * @default: true
   * animate the dialog in and out (not supported in < IE 10)
   */
  animate: true,
  
  /**
   * @optional String
   * @default: null
   * an additional class to apply to the dialog wrapper
   */
  className: (cls||""),
  
  /**
   * @optional Object
   * @default: {}
   * any buttons shown in the dialog's footer
   */
  buttons: {
    
    // For each key inside the buttons object...
    
    /**
     * @required Object|Function
     * 
     * this first usage will ignore the `success` key
     * provided and take all button options from the given object
     */
    ok: {   
      /**
       * @required String
       * this button's label
       */
      label: "Ok",
      
      /**
       * @optional String
       * an additional class to apply to the button
       */
      className: "btn-default",
      
      /**
       * @optional Function
       * the callback to invoke when this button is clicked
       */
      callback: function() {}
    },
  }
}); }

window.alerterror = function(msg){
	window.customalert(msg,"Oh no!","modal-alert-error");
}

window.alertsuccess = function(msg){
	window.customalert(msg,"Success.","modal-alert-success");
}

window.alert = function(msg){
	window.customalert(msg,"Notification","modal-alert");
}
