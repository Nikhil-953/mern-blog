import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
            default:
                'https://imgs.search.brave.com/jW-0Qvnvo_Csxzy042Lr-tjXKEAdUhHFD6L5EssMX8o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hcGku/anVuaWEuYWkvc3Rv/cmFnZS92MS9vYmpl/Y3Qvc2lnbi91c2Vy/LWdlbmVyYXRlZC1p/bWFnZXMvZjJmOThk/NWUtNjNjNC00MTJi/LTkyY2QtZjgyNDI5/NTE3YWRkL0dyb3Vw/JTIwMTE0NzUlMjAo/MSkucG5nP3Rva2Vu/PWV5SmhiR2NpT2lK/SVV6STFOaUlzSW5S/NWNDSTZJa3BYVkNK/OS5leUoxY213aU9p/SjFjMlZ5TFdkbGJt/VnlZWFJsWkMxcGJX/Rm5aWE12WmpKbU9U/aGtOV1V0TmpOak5D/MDBNVEppTFRreVky/UXRaamd5TkRJNU5U/RTNZV1JrTDBkeWIz/VndJREV4TkRjMUlD/Z3hLUzV3Ym1jaUxD/SnBZWFFpT2pFM01U/RTNNRGcxTURrc0lt/VjRjQ0k2TWpBeU56/QTJPRFV3T1gwLnlK/Z1Iwc256T2NyZk1B/VG9JNkloOUtYN08z/Y0ZxbWZhd3NEWDhV/SGdlUE0',
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        category: {
            type: String,
            default: 'uncategorized',
        },
    },{timestamps: true}
);

const Post = mongoose.model('Post', postSchema);

export default Post;