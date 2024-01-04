import { FastifyReply, FastifyRequest } from "fastify";
import {
  getBodyPartList,
  getEquipmentList,
  getExercises,
  getExercisesByBodyPart,
  getExercisesByEquipment,
  getExercisesByIdService,
  getExercisesByMuscleTarget,
  getExercisesByNameService,
  getMuscleTargetList,
} from "./exercise.services";
import { HTTP_STATUS_CODE } from "../../enums/http-status-codes";
import { createSuccessResponse } from "../../utils/httpResponse";
import { TExercisesResponse } from "./exercise.types";

/**
 * Controller used to fetch all the exercises from db
 */
export const getExercisesController = async (
  request: FastifyRequest<{
    Querystring: {
      limit: string;
      offset: string;
    };
  }>,
  reply: FastifyReply
): Promise<TExercisesResponse[]> => {
  const limit = request.query.limit || 10;
  const offset = request.query.offset || 0;

  const exercises = await getExercises(Number(limit), Number(offset));

  return reply.code(HTTP_STATUS_CODE.ACCEPTED).send(
    createSuccessResponse({
      status: HTTP_STATUS_CODE.ACCEPTED,
      message: "Exercises fetched successfully!",
      data: exercises,
    })
  );
};
/**
 * Controller used to fetch all the exercises by name from db
 */
export const getExercisesByNameController = async (
  request: FastifyRequest<{
    Querystring: {
      name: string;
      limit: string;
      offset: string;
    };
  }>,
  reply: FastifyReply
) => {
  const { name, limit, offset } = request.query;

  const exercises = await getExercisesByNameService({
    exerciseName: name,
    limit: Number(limit),
    offset: Number(offset),
  });
  return reply.code(HTTP_STATUS_CODE.ACCEPTED).send(
    createSuccessResponse({
      status: HTTP_STATUS_CODE.ACCEPTED,
      message: "Exercises fetched successfully!",
      data: exercises,
    })
  );
};

/**
 * Controller used to get a specific exercised based on exercised id
 */
export const getExerciseById = async (
  request: FastifyRequest<{
    Params: {
      exerciseId: string;
    };
  }>,
  reply: FastifyReply
) => {
  const { exerciseId } = request.params;

  const exercise = await getExercisesByIdService(exerciseId);

  return reply.code(HTTP_STATUS_CODE.ACCEPTED).send(
    createSuccessResponse({
      status: HTTP_STATUS_CODE.ACCEPTED,
      message: `Exercise with id ${exerciseId} has been fetched successfully!`,
      data: exercise,
    })
  );
};
/**
 * Controller used to get the exercises associated with a specific muscle
 */
export const getExerciseByMuscleTarget = async (
  request: FastifyRequest<{
    Querystring: {
      target: string;
      limit: string;
      offset: string;
    };
  }>,
  reply: FastifyReply
) => {
  const { target, limit, offset } = request.query;

  const exercises = await getExercisesByMuscleTarget({
    muscleTarget: target,
    limit: Number(limit),
    offset: Number(offset),
  });

  return reply.code(HTTP_STATUS_CODE.ACCEPTED).send(
    createSuccessResponse({
      status: HTTP_STATUS_CODE.ACCEPTED,
      message: `Exercises with target ${target} has been fetched successfully!`,
      data: exercises,
    })
  );
};
/**
 * Controller used to get the exercises associated with a specific equipment
 */
export const getExercisesByEquipmentController = async (
  request: FastifyRequest<{
    Querystring: {
      equipmentType: string;
      limit: string;
      offset: string;
    };
  }>,
  reply: FastifyReply
) => {
  const { equipmentType, limit, offset } = request.query;

  const exercises = await getExercisesByEquipment({
    equipmentType,
    limit: Number(limit),
    offset: Number(offset),
  });

  return reply.code(HTTP_STATUS_CODE.ACCEPTED).send(
    createSuccessResponse({
      status: HTTP_STATUS_CODE.ACCEPTED,
      message: `Exercises associated with the equipment ${equipmentType} has been fetched successfully!`,
      data: exercises,
    })
  );
};
/**
 * Controller used to get the list with all the target muscles
 */
export const getMuscleTargetListController = async (
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  const muscleTargeList = await getMuscleTargetList();

  return reply.code(HTTP_STATUS_CODE.ACCEPTED).send(
    createSuccessResponse({
      status: HTTP_STATUS_CODE.ACCEPTED,
      message: "Muscle target list has been fetched successfully!",
      data: muscleTargeList,
    })
  );
};

/**
 * Controller used to get all the equipments
 */
export const getEquipmentListController = async (
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  const equipmentList = await getEquipmentList();

  return reply.code(HTTP_STATUS_CODE.ACCEPTED).send(
    createSuccessResponse({
      status: HTTP_STATUS_CODE.ACCEPTED,
      message: "Equipment list has been fetched successfully!",
      data: equipmentList,
    })
  );
};

/**
 * Controller used to get the list with body parts
 */
export const getBodyPartListController = async (
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  const bodyPartList = await getBodyPartList();

  return reply.code(HTTP_STATUS_CODE.ACCEPTED).send(
    createSuccessResponse({
      status: HTTP_STATUS_CODE.ACCEPTED,
      message: "Body part list has been fetched successfully!",
      data: bodyPartList,
    })
  );
};

/**
 * Controller used to get all the exercises for a specific body part
 */
export const getExercisesByBodyPartController = async (
  request: FastifyRequest<{
    Querystring: {
      bodyPart: string;
      limit: string;
      offset: string;
    };
  }>,
  reply: FastifyReply
) => {
  const { bodyPart, limit, offset } = request.query;
  const exercises = await getExercisesByBodyPart({
    bodyPart,
    limit: Number(limit),
    offset: Number(offset),
  });

  return reply.code(HTTP_STATUS_CODE.ACCEPTED).send(
    createSuccessResponse({
      status: HTTP_STATUS_CODE.ACCEPTED,
      message: `Exercises for body part ${bodyPart} have been successfully fetched!`,
      data: exercises,
    })
  );
};
