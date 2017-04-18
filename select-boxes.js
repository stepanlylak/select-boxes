import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { ReactiveVar } from 'meteor/reactive-var';

import './select-boxes.html';

Template.Select_boxes.onCreated(function(){
    this.active = new ReactiveVar( false );
    this.options = new ReactiveVar( false );

    this.setActive = data => {
        this.active.set(data);
        if(this.data.onChange && _.isFunction(this.data.onChange)) {
            this.data.onChange.call(this.active.get());
        }
    };

    this.autorun(() => {
        const cd = Template.currentData();
        if(cd && cd.options && !_.isNull(cd.options)) {
            if(!cd.txtKey) cd.txtKey = 'txt';
            if(!cd.valKey) cd.valKey = 'val';
            this.options.set(_.map((cd.ignor ? _.filter(cd.options, v => !v[cd.ignor]) : cd.options), (v,k) => {
                const obj = {val: v[cd.valKey], txt: v[cd.txtKey]};
                if(cd.marker) obj.marker = v[cd.marker];
                return obj;
            }));
            if(!this.active.get()) this.active.set(this.options.get()[0]);
            if(cd.currentVal != this.prevVal) {
                this.active.set(_.findWhere(this.options.get(), {val: cd.currentVal}));
                this.prevVal = cd.currentVal;
            }
        }
    });

    $(document).on('click', function(event) {
        if (!$(event.target).closest('.select-box.opened').length) {
            $('.select-box').removeClass('opened post-top pos-bottom');
        }
    });
});

Template.Select_boxes.helpers({
    _options() {
        const t = Template.instance();
        return t.options.get();
    },
    _active() {
        const t = Template.instance();
        return t.active.get();
    },
    _activeCheck() {
        const t = Template.instance(), active = t.active.get();
        return this.val == active.val && 'active';
    }
});

Template.Select_boxes.events({
    'click .select-box-options > div': function(e, t) {
        t.setActive(this);
        $('.select-box').removeClass('opened post-top pos-bottom');
    },
    'click .select-box-btn': function(e, template) {
        var $this = $(e.currentTarget), $parent = $this.parent(), $list = $this.next();
        if($parent.hasClass('opened')) {
            $parent.removeClass('opened post-top pos-bottom');
        } else {
            $parent.addClass('opened');
            if(($(window).height() - $parent.offset().top) <= $list.height()) {
                $parent.addClass('pos-top');
            } else {
                $parent.addClass('pos-bottom');
            }
        }
    }
});
