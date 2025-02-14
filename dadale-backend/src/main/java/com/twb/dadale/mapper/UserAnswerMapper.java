package com.twb.dadale.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.twb.dadale.model.dto.statistic.AppAnswerCountDTO;
import com.twb.dadale.model.dto.statistic.AppAnswerResultCountDTO;
import com.twb.dadale.model.entity.UserAnswer;
import org.apache.ibatis.annotations.Select;

import java.util.List;


/**
 * @author twb
 * @description 针对表【user_answer(用户答题记录)】的数据库操作Mapper
 * @createDate 2024-12-13 08:32:49
 * @Entity generator.domain.UserAnswer
 */
public interface UserAnswerMapper extends BaseMapper<UserAnswer> {
    @Select("select appId,count(userId) as answerCount from user_answer\n" +
            "group by appId\n" +
            "order by answerCount desc limit 10")
    List<AppAnswerCountDTO> doAppAnswerCount();

    @Select("select resultName,count(resultName) as resultCount from user_answer\n" +
            "where appId=#{appId}\n" +
            "group by resultName order by resultCount desc")
    List<AppAnswerResultCountDTO> doAppAnswerResultCount(Long appId);
}




