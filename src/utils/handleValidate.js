import { HttpError } from "./httpError";
export const validateRequest = (req, next, schema) => {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true, // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        throw new HttpError(
            `${error.details.map((x) => x.message).join(", ")}`,
            400
        );
    } else {
        req.body = value;
        next();
    }
};

export const validateRequestAdmin = (req, res, next, schema) => {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true, // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        res.redirect(
            req.get("referer") +
                `?msg=${error.details.map((x) => x.message).join(", ")}`
        );
    } else {
        req.body = value;
        next();
    }
};
