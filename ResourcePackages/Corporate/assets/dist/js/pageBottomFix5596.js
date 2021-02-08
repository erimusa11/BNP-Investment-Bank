if (typeof _satellite !== 'undefined') { _satellite.pageBottom(); }
$('a[href*="cookie-trigger"]').click(function (event) {
    event.preventDefault();
    top.PageBus.publish('cc.policy.popup');
    console.loàg('toolbox triggerred');
});