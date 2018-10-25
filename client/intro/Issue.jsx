import React from "react";

export default class Issue extends React.Component {
    handleDragStart = e => {
        const { student, stage, player } = this.props;
        const dragger = stage.get(`student-${student}-dragger`); //check if there is already a dragger
        //if so, you can't move it, already someone is moving it!
        if (dragger) {
            // Can't drag
            console.log("dragger");
            e.preventDefault();
            return;
        }
        stage.set(`student-${student}-dragger`, player._id);
        stage.append("log", {
            verb: "draggingStudent",
            subjectId: player._id,
            object: student,
            at: new Date()
        });
        e.dataTransfer.setData("text/plain", student);
    };

    handleDragOver = e => {
        e.preventDefault();
    };

    handleDragLeave = e => {
        e.preventDefault();
        console.log("released!");
        const { student, stage } = this.props;
        stage.set(`student-${student}-dragger`, null);
    };

    handleDragEnd = e => {
        e.preventDefault();
        const { student, stage, player} = this.props;
        stage.set(`student-${student}-dragger`, null);

        //if dropped into non-allowed area
        if (e.dataTransfer.dropEffect === "none") {
            stage.append("log", {
                verb: "releasedStudent",
                subjectId: player._id,
                object: student
            });
        }
    };

    render() {
        const {issue} = this.props;
        const objectName = issue.name;
        const objcctNum = issue.quantity;
        const objectVal = issue.value;
        let ListImgs = []

        _.times(objcctNum, i => {
            ListImgs.push(
                <img
                    key = {objectName + i.toString()}
                    src = {"./resources/objects/"+objectName+".png"}
                    width = "40px"/>
            );
        })

        return (
            <div>
                <p>
                    {objectName} : {ListImgs}
                </p>
            </div>
        );
    }
}


