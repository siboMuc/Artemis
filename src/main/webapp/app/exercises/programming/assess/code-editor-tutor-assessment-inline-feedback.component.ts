import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Feedback, FeedbackType, MANUAL_ASSESSMENT_IDENTIFIER } from 'app/entities/feedback.model';
import { cloneDeep } from 'lodash';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'jhi-code-editor-tutor-assessment-inline-feedback',
    templateUrl: './code-editor-tutor-assessment-inline-feedback.component.html',
})
export class CodeEditorTutorAssessmentInlineFeedbackComponent {
    MANUAL = FeedbackType.MANUAL;
    @Input()
    get feedback(): Feedback {
        return this._feedback;
    }
    set feedback(feedback: Feedback) {
        this._feedback = feedback || new Feedback();
        this.oldFeedback = cloneDeep(this.feedback);
        this.editOnly = feedback ? true : false;
    }
    private _feedback: Feedback;
    @Input()
    fileName: string;
    @Input()
    codeLine: number;
    @Input()
    readOnly: boolean;
    @Output()
    onUpdateFeedback = new EventEmitter<Feedback>();
    @Output()
    onCancelFeedback = new EventEmitter<number>();
    @Output()
    onDeleteFeedback = new EventEmitter<Feedback>();
    @Output()
    onEditFeedback = new EventEmitter<number>();

    editOnly: boolean;
    oldFeedback: Feedback;
    constructor(private translateService: TranslateService) {}

    updateFeedback() {
        this.feedback.type = this.MANUAL;
        this.feedback.reference = `${MANUAL_ASSESSMENT_IDENTIFIER}_file:${this.fileName}_line:${this.codeLine}`;
        this.editOnly = true;
        this.feedback.text = `Feedback for ${this.fileName} line: ${this.codeLine}`;
        this.onUpdateFeedback.emit(this.feedback);
    }

    cancelFeedback() {
        console.log('cancel pressed');
        console.log('feedback before: ', this.feedback);
        // The current feedback was not saved yet then do not show the inline feedback component, otherwise show the readonly mode
        if (this.feedback.type === this.MANUAL) {
            this.feedback = this.oldFeedback;
            this.editOnly = true;
        }
        console.log('feedback after: ', this.feedback);
        this.onCancelFeedback.emit(this.codeLine);
    }

    deleteFeedback() {
        const text: string = this.translateService.instant('artemisApp.feedback.delete.question', { id: this.feedback.id ?? '' });
        const confirmation = confirm(text);
        if (confirmation) {
            this.onDeleteFeedback.emit(this.feedback);
        }
    }

    editFeedback(line: number) {
        this.editOnly = false;
        this.onEditFeedback.emit(line);
    }
}
