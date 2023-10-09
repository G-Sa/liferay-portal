package com.liferay.object.internal.upgrade.v8_7_0;

import com.liferay.petra.string.StringBundler;
import com.liferay.portal.dao.orm.common.SQLTransformer;
import com.liferay.portal.kernel.dao.jdbc.AutoBatchPreparedStatementUtil;
import com.liferay.portal.kernel.upgrade.UpgradeProcess;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class ObjectResourcePrimKeyUpgradeProcess extends UpgradeProcess {

	@Override
	protected void doUpgrade() throws Exception {
		try (PreparedStatement preparedStatement1 = connection.prepareStatement(
			SQLTransformer.transform(
				"select objectDefinitionId, companyId, userId, userName, externalReferenceCode from ObjectDefinition"));
			 PreparedStatement preparedStatement2 =
				 AutoBatchPreparedStatementUtil.concurrentAutoBatch(
					 connection,
					 StringBundler.concat(
						 "update ResourcePermission set primKey = ?" +
						 "where companyId = ? and primKeyId = ?"));
			 ResultSet resultSet = preparedStatement1.executeQuery()
			 ){
			while (resultSet.next()) {
				preparedStatement2.setString(1, resultSet.getString("externalReferenceCode"));
				preparedStatement2.setLong(2, resultSet.getLong("companyId"));
				preparedStatement2.setLong(3, resultSet.getLong("objectDefinitionId"));

				preparedStatement2.addBatch();
			}
			preparedStatement2.executeBatch();

		}
	}
}
