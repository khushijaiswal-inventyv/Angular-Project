import multer from "multer";
import { handleUpload } from "../../helpers";

const storage = multer.memoryStorage();
const uploads = multer({ storage });
const myUploadMiddleware = uploads.single("img");
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
  }
  const handler = async (req, res) => {
    try {
      await runMiddleware(req, res, myUploadMiddleware);
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const cldRes = await handleUpload(dataURI);
      res.json(cldRes);
    } catch (error) {
      console.log(error);
      res.send({
        message: error.message,
      });
    }
  };
  export default handler;
  export const config = {
    api: {
      bodyParser: false,
    },
  };
      