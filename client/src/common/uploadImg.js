const UploadImg = () => {
    return (
        <div className="pop-up">
            <form>
                <input type="file" name="image" />
                <button type="button">cancel</button>
                <button>upload</button>
            </form>
        </div>
    )
}

export default UploadImg;