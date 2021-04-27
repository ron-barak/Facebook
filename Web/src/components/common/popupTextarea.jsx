import $ from "jquery";
const PopupTextarea = ({ renderTextarea }) => {
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content mr-5">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add posts:
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div>{renderTextarea}</div>

            <button
              className="col-lg-12 btn btn-primary text-center"
              onClick={() =>
                $("#exampleModal")
                  .modal("hide")
                  .on("hidden.bs.modal", function () {
                    $(this).find("textarea").val("").end();
                  })
              }
            >
              post
            </button>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupTextarea;
