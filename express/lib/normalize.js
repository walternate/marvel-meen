var _ = require('lodash'),
	uuid = require('node-uuid');

normalize = {
	genUniqueId: function() {
		return uuid.v4();
	},

	normalize: function(payload, type) {
		var _this = this,
			record = _.cloneDeep(payload[type]),
			recordId;

		if( !record ) return;

		if( _.isArray(record) ) {
			recordId = [];

			record.forEach(function(rec, index) {
				var uniqueId = _.isObject(rec) && rec.id ? rec.id : _this.genUniqueId();
				recordId.push(uniqueId);
				rec.id = uniqueId;
			});

			payload[type] = recordId;

			return record;
		}
		else if( _.isObject(record) ) {
			recordId = record.id || this.genUniqueId();
			payload[type] = recordId;
			record.id = recordId;
			return record;
		}
	},

	normalizeRecords: function(payload, type, pluralType, container) {
		var _this = this;

		payload[pluralType] = _.isArray(payload[pluralType]) ? payload[pluralType] : [];

		payload[container].forEach(function(record, index) {
			var newRecord = _this.normalize(record, type);
			
			if( _.isArray(newRecord) ) {
				payload[pluralType]	= payload[pluralType].concat(newRecord);
			}
			else if( _.isObject(newRecord) ) {
				payload[pluralType].push(newRecord);
			}
		});

		return payload;
	}
}

module.exports = normalize;