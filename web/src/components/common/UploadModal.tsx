import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

function UploadModal() {

  const onDrop = useCallback((acceptedFiles) => {
    console.log("Files:", acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      className="modal fade"
      id="uploadModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered mw-650px">
        <div className="modal-content">

          <div className="modal-header">
            <h2 className="fw-bold">Upload Files</h2>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body pt-10 pb-15 px-lg-17">

            <div className="form-group">

              <div
                {...getRootProps()}
                className="border border-dashed p-5 text-center"
                style={{ cursor: "pointer" }}
              >

                <input {...getInputProps()} />

                <p>Drag & drop files here</p>
                <p className="text-muted">or click to select files</p>

              </div>

              <span className="form-text fs-6 text-muted">
                Max file size is 1MB per file
              </span>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default UploadModal;