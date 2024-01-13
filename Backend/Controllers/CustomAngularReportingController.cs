﻿using DevExpress.AspNetCore.Reporting.QueryBuilder;
using DevExpress.AspNetCore.Reporting.QueryBuilder.Native.Services;
using DevExpress.AspNetCore.Reporting.ReportDesigner;
using DevExpress.AspNetCore.Reporting.ReportDesigner.Native.Services;
using DevExpress.AspNetCore.Reporting.WebDocumentViewer;
using DevExpress.AspNetCore.Reporting.WebDocumentViewer.Native.Services;

namespace Backend.Controllers
{
    [Authorize]
    [Route("DXXRDVAngular")]
    public class AngularWebDocumentViewerController : WebDocumentViewerController
    {
        public AngularWebDocumentViewerController(IWebDocumentViewerMvcControllerService controllerService) : base(controllerService)
        {
        }
    }

    [Authorize]
    [Route("DXXQBAngular")]
    public class AngularQueryBuilderController : QueryBuilderController
    {
        public AngularQueryBuilderController(IQueryBuilderMvcControllerService controllerService) : base(controllerService)
        {
        }
    }


    [Route("DXXRDAngular")]
    [Authorize]
    public class AngularReportDesignerController : ReportDesignerController
    {
        public AngularReportDesignerController(IReportDesignerMvcControllerService controllerService) : base(controllerService)
        {
        }
    }
}
