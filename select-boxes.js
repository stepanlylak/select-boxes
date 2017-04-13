import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { ReactiveVar } from 'meteor/reactive-var';
    
import './select-boxes.html';

Template.Select_boxes.onCreated(function(){
    this.active = new ReactiveVar( false );
    
    this.setActive = data => {
        this.active.set(data);
        if(this.data.onChange && _.isFunction(this.data.onChange)) {
            this.data.onChange.call(this.active.get());
        }
    };
    
    $(document).on('click', function(event) {
        if (!$(event.target).closest('.select-box.opened').length) {
            $('.select-box').removeClass('opened post-top pos-bottom');
        }
    });
});

Template.Select_boxes.helpers({
    options() {
        const t = Template.instance(), active = t.active.get(), conf = t.data;
        if(!conf || (!conf.options && !_.isNull(conf.options))) return null;
        let init = false;
        if(!conf.txtKey) conf.txtKey = 'txt';
        if(!conf.valKey) conf.valKey = 'val';
        
        if(!t.back && conf.currentVal ) {
            init = true;
            t.back = _.clone(conf.currentVal);
        }

        return _.map((conf.ignor ? _.filter(conf.options, v => !v[conf.ignor]) : conf.options), (v,k) => {
            var obj = {'val': v[conf.valKey], 'txt': v[conf.txtKey], active: conf.currentVal == v[conf.valKey] || v[conf.valKey] == active.val};
            if(conf.marker) obj.marker = v[conf.marker];
            if(init || (conf.currentVal != t.back && conf.currentVal == v[conf.valKey]) || (!active && k == 0)) {
                t.active.set(obj);
                t.back = _.clone(conf.currentVal);
                init = false;
            }
            return obj;
        });
    },
    active() {
        return Template.instance().active.get();
    },
    activeCheck() {
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